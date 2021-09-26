var mercator = require('global-mercator');
var http = require('http');
var fs = require('fs');
var sqlite = require('sqlite3');
var got = require('got');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
var tunnel = require('tunnel');
var UUID = require('uuid');
var path = require('path');

const commitCount = 400;
const maxgot = 100;


function TileDownloader(options) {

    this.bounds = options.bounds;
    this.bounds[0] = Math.max(this.bounds[0], -180);
    this.bounds[1] = Math.max(this.bounds[1], -90);
    this.bounds[2] = Math.min(this.bounds[2], 180);
    this.bounds[3] = Math.min(this.bounds[3], 90);
    console.log("TileDownloader", this.bounds);

    this.levelrange = options.levelrange;
    this.output = options.output;
    this.basePath = options.basePath;
    this.url = options.url;
    this.type = options.type ? options.type : 'image';
    this.layerjson = options.layerjson;
    this.source = options.source ? options.source : '未知数据源';

    this.proxy = null;
    if (options.proxy && options.proxy.host && options.proxy.port) {
        this.proxy = tunnel.httpOverHttp({
            proxy: options.proxy
        });
    }
    ;
    console.log("TileDownloader", this.proxy);

    //最大同时下载个数
    this.maxgot = options.maxgot ? options.maxgot : maxgot;

    //检测任务的时间
    this.taskinterval = options.taskinterval ? options.taskinterval : Math.max(1000 / this.maxgot, 100);

    //总需要下载的tile个数
    this.allTileCount = 0;
    //当前正在下载的个数
    this.downloading = 0;

    //已经完成的个数 包括失败的
    this.finishedCount = 0;

    //该下载周期的下载数据量
    this.downloadBytes = 0;
    //下载速度
    this.downloadSpeed = 0;
    //状态
    this.state = 'idle';

    this.failedTile = [];

    this.lngLatToXY = function (lonlat, level, ltrb) {
        console.log("TileDownloader lngLatToXY", this.type, level);
        if (this.type == 'image')
            return mercator.lngLatToGoogle(lonlat, level);
        else {
            var w = 180 / (1 << level);


            var x = Math.floor((lonlat[0] + 180) / w);

            var y = Math.floor((90 - lonlat[1]) / w);

            return [x, y];
        }
    }
    //计算总块数
    for (var level = this.levelrange[0]; level <= this.levelrange[1]; level++) {

        //对于地形的第0级需要下载世界范围
        var lefttop, rightbuttom;
        if (level == 0 && this.type != 'image') {
            lefttop = this.lngLatToXY([-180, 90], level, true);
            rightbuttom = this.lngLatToXY([180, -90], level, false);
        } else {
            lefttop = this.lngLatToXY([this.bounds[0], this.bounds[3]], level, true);
            rightbuttom = this.lngLatToXY([this.bounds[2], this.bounds[1]], level, false);
        }


        console.log("TileDownloader", level, lefttop, rightbuttom);
        var yMax = lefttop[1] > rightbuttom[1] ? lefttop[1] : rightbuttom[1];
        var yMin = lefttop[1] <= rightbuttom[1] ? lefttop[1] : rightbuttom[1];
        var xMax = lefttop[0] > rightbuttom[0] ? lefttop[0] : rightbuttom[0];
        var xMin = lefttop[0] <= rightbuttom[0] ? lefttop[0] : rightbuttom[0];
        for (var y = yMin; y <= yMax; y++) {
            for (var x = xMin; x <= xMax; x++) {

                this.allTileCount++;

                if (this.allTileCount == 143624) {
                    console.log(level, x, y);
                }
            }
        }
        console.log("TileDownloader allTileCount", this.allTileCount);
    }

    if (this.allTileCount == 0) {
        throw new Error('没有可下载的瓦片');
        return;
    }

    //保存完一个块之后，按需提交事务  放出进度事件
    this._finishedOne = function () {
        this.finishedCount++;

        try {
            if (!this._hasNext()) {
                //this.db.exec('COMMIT TRANSACTION;');
            } else if (this.finishedCount % commitCount == 0) {
                this.db.exec('COMMIT TRANSACTION;BEGIN TRANSACTION;');
            }
        } catch (ex) {
            console.log(ex);
        }

        this.emit('progress');
    }

    //根据tile获得表名，对于超大数据，可以用来分表

    function mkdirs(dirpath) {
        if (!fs.existsSync(path.dirname(dirpath))) {
            mkdirs(path.dirname(dirpath));
        }
        if (!fs.existsSync(dirpath)) {
            fs.mkdirSync(dirpath);
        }
    }

    this._getFilePath = function (tile) {
        let res = ''
        /*if (Number(tile.level) < 10) {
          res = 'blocks';
        } else {
          var tx = Math.floor(tile.x / 512);
          var ty = Math.floor(tile.y / 512);
          res = 'blocks_' + tile.level + "_" + tx + "_" + ty;
        }*/
        let basePath = path.join(tile.output || this.output, res, tile.level + "", tile.x + "")
        console.log("basePath", basePath)
        try {
            mkdirs(basePath);
        } catch (e) {
            console.error(e)
        }
        return path.join(basePath, tile.y + ".png");
    }
    //生成一个got下载完成的响应函数 来保存到文件
    this._saveTileData = function (tile) {
        var self = this;
        var db = this.db;
        return function (response) {
            self.downloadBytes += response.body.length;

            var basePath = self._getFilePath(tile);

            try {
                fs.writeFile(basePath, response.body, function (err) {
                    if (err) {
                        console.log("write data error:", err)
                    }
                    self._finishedOne();
                })
            } catch (ex) {
                console.log(ex);
            }

        };
    }

    function r(min, max) {
        return Math.floor(min + Math.random() * (max - min));
    }

    function getRandomIp() {
        return r(1, 255) + "." + r(1, 255) + "." + r(1, 255) + "." + r(1, 255);
    }

    //下载某个tile
    this._downloadTile = function (tile) {
        if (this.filterTile(tile)) {

            this._finishedOne();
            return;
        }

        var self = this;

        var y = tile.y;
        //如果是地形，那么y要进行反转
        if (this.type != 'image') {

            y = (1 << tile.level) - y - 1;
            y = Math.max(0, y);
        }

        var url = this.url.replace('{x}', tile.x).replace('{y}', y).replace('{z}', tile.level);


        got(url, {
            encoding: null,
            agent: this.proxy,
            timeout: 100000,
            retries: 5,
            headers: {
                'X-Forwarded-For': getRandomIp(),
                Referer: 'http://cesiumjs.org/Cesium/Build/Apps/CesiumViewer/index.html?view=91.66990268014597%2C27.73688641447013%2C47612.305091729926%2C3.9597765481872633%2C-10.024064619450886%2C359.99745176237195',
                Accept: 'application/vnd.quantized-mesh;extensions=octvertexnormals-watermask,application/octet-stream;q=0.9,*/*;q=0.01',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.98 Safari/537.36'
            }
        })
            .then(this._saveTileData(tile))
            .then(response => {
                self.downloading--;
                //统计下载下载速度等
                this.emit('progress');
            })
            .catch(error => {
                self.downloading--;
                self._finishedOne();
                //this.emit('progress');
                if (error.statusMessage == 'Forbidden') {
                    self.failedTile.push(tile);

                    if (self.intervalID) {
                        var t = 3600;
                        console.log('because Forbidden ,will restart after ' + t + 's');
                        self._startAfterSomeTime(t * 1000);
                    }
                } else if (error.statusCode != 404)
                    console.log(error);

            });
        this.downloading++;
        this.emit('progress');
    }
    //下一个级别
    this._levelFirst = function (level) {

        //对于地形的第0级需要下载世界范围
        var lefttop, rightbuttom;
        if (level == 0 && this.type != 'image') {
            lefttop = this.lngLatToXY([-180, 90], level, true);
            rightbuttom = this.lngLatToXY([180, -90], level, false);
        } else {
            lefttop = this.lngLatToXY([this.bounds[0], this.bounds[3]], level, true);
            rightbuttom = this.lngLatToXY([this.bounds[2], this.bounds[1]], level, false);
        }
        console.log("_levelFirst", level, lefttop, rightbuttom);
        var yMax = lefttop[1] > rightbuttom[1] ? lefttop[1] : rightbuttom[1];
        var yMin = lefttop[1] <= rightbuttom[1] ? lefttop[1] : rightbuttom[1];
        var xMax = lefttop[0] > rightbuttom[0] ? lefttop[0] : rightbuttom[0];
        var xMin = lefttop[0] <= rightbuttom[0] ? lefttop[0] : rightbuttom[0];

        this.current = {
            level: level,
            minx: xMin,
            maxx: xMax,
            miny: yMin,
            maxy: yMax,
            x: xMin,
            y: yMin
        }
    }
    this.filterTile = function (tile) {
        //return false;
        if (!this.layerjson)
            return false;
        //return false;

        var x = tile.x;
        var y = tile.y;

        if (this.type != 'image') {

            y = (1 << tile.level) - y - 1;
            y = Math.max(0, y);
        }

        var la = this.layerjson.available[tile.level];

        for (var i = 0; i < la.length; i++) {
            var block = la[i];
            if (block.startX <= x && block.endX >= x && block.startY <= y && block.endY >= y) {
                //console.log('filter:' + tile);
                return false;
            }
        }
        //console.log('filter:' + tile);
        console.log(tile.x + '_' + tile.y + '_' + tile.level + '为空');
        return true;
    }
    //判断是否还有后续任务
    this._hasNext = function () {

        if (!this.current)
            return true;

        if (this.current.x < this.current.maxx) {
            return true;
        }
        //下一行
        else if (this.current.y < this.current.maxy) {

            return true;
        }
        //下一个级别
        else if (this.current.level < this.levelrange[1]) {
            return true;
        }
        return false;
    }
    //退回到前一个块
    this._goBack = function () {

        //横向下一个
        if (this.current.x > this.current.minx) {
            this.current.x--;
        }
        //下一行
        else if (this.current.y > this.current.miny) {

            this.current.y--;
            this.current.x = this.current.maxx;
        }
        //下一个级别
        else if (this.current.level > this.levelrange[0]) {
            this._levelFirst(this.current.level - 1);
        }
    }

    this._caculFinished = function () {
        this.finishedCount = 0;
        for (var level = this.levelrange[0]; level <= this.current.level; level++) {

            //对于地形的第0级需要下载世界范围
            var lefttop, rightbuttom;
            if (level == 0 && this.type != 'image') {
                lefttop = this.lngLatToXY([-180, 90], level, true);
                rightbuttom = this.lngLatToXY([180, -90], level, false);
            } else {
                lefttop = this.lngLatToXY([this.bounds[0], this.bounds[3]], level, true);
                rightbuttom = this.lngLatToXY([this.bounds[2], this.bounds[1]], level, false);
            }
            console.log("TileDownloader", level, lefttop, rightbuttom);
            var yMax = lefttop[1] > rightbuttom[1] ? lefttop[1] : rightbuttom[1];
            var yMin = lefttop[1] <= rightbuttom[1] ? lefttop[1] : rightbuttom[1];
            var xMax = lefttop[0] > rightbuttom[0] ? lefttop[0] : rightbuttom[0];
            var xMin = lefttop[0] <= rightbuttom[0] ? lefttop[0] : rightbuttom[0];

            if (level != this.current.level) {
                for (var y = yMin; y <= yMax; y++) {
                    for (var x = xMin; x <= xMax; x++) {

                        this.finishedCount++;
                    }
                }
            } else {
                for (var y = yMin; y <= this.current.y; y++) {
                    if (y < this.current.y) {
                        for (var x = xMin; x <= xMax; x++) {

                            this.finishedCount++;
                        }
                    } else {
                        for (var x = xMin; x < this.current.x; x++) {
                            this.finishedCount++;
                        }
                    }
                }
            }
        }
        console.log('finishedCount:', this.finishedCount);

    }
    //进度重启
    this._resumeTask = function (cur) {

        console.log('resumeTask:', cur);

        var level = cur.cur_level;

        var lefttop, rightbuttom;
        if (level == 0 && this.type != 'image') {
            lefttop = this.lngLatToXY([-180, 90], level, true);
            rightbuttom = this.lngLatToXY([180, -90], level, false);
        } else {
            lefttop = this.lngLatToXY([this.bounds[0], this.bounds[3]], level, true);
            rightbuttom = this.lngLatToXY([this.bounds[2], this.bounds[1]], level, false);
        }

        this.current = {
            level: level,
            minx: lefttop[0],
            maxx: rightbuttom[0],
            miny: lefttop[1],
            maxy: rightbuttom[1],
            x: cur.cur_x,
            y: cur.cur_y
        };

        //往前跳几个 避免缺失几个块
        var idx = 0;
        while (idx < this.maxgot * 2) {
            this._goBack();
            idx++;
            //console.log(this.current);
        }

        //计算已经完成
        this._caculFinished();

    }

    //下一个块任务
    this._next = function () {

        if (this.failedTile.length > 0) {

            var t = this.failedTile.shift();
            this._downloadTile(t);
            return true;
        }

        if (!this.current) {
            this._levelFirst(this.levelrange[0])
        } else {
            //横向下一个
            if (this.current.x < this.current.maxx) {
                this.current.x++;
            }
            //下一行
            else if (this.current.y < this.current.maxy) {

                this.current.y++;
                this.current.x = this.current.minx;
            }
            //下一个级别
            else if (this.current.level < this.levelrange[1]) {
                this._levelFirst(this.current.level + 1);
            }
            //全部结束
            else {
                return false;
            }
        }

        this._downloadTile({level: this.current.level, x: this.current.x, y: this.current.y});

        return true;
    }
    //该定时器函数用来定时判定 是否需要追加下载任务
    this._intervalFunc = function () {

        while (this.downloading < this.maxgot && this._hasNext()) {
            //console.log('while:', this.downloading, this.finishedCount, this.allTileCount);
            if (!this._next())
                break;
        }

        //结束
        if (!this._hasNext()) {

            if (this.downloading <= 0) {
                var self = this;
                this._stop(function () {
                    self.state = 'finished';
                    self.emit('finished');
                });
            }

        }
    }
    this._startAfterSomeTime = function (t) {
        clearInterval(this.intervalID);
        this.intervalID = undefined;

        var self = this;
        setTimeout(function () {
            self._start();
        }, t);
    }
    this._start = function () {
        var self = this;
        //启动定时器，每10ms去执行一下
        var start = new Date();
        this.intervalID = setInterval(function () {
            self._intervalFunc();

            var td = new Date() - start;

            if (td > 1000) {
                start = new Date();

                self.downloadSpeed = Math.floor(self.downloadBytes / td);
                self.downloadBytes = 0;
                self.emit('speed');
            }
        }, this.taskinterval);


        this.state = 'started';
        this.emit('started');
    }

    //结束函数，保存进度
    this._stop = function (cb) {
        var self = this;
        clearInterval(this.intervalID);
        this.intervalID = null;
        //最后结束的时候才插入最终记录
        try {
            this.db.run("REPlACE INTO infos VALUES (?,?,?,?,?,?,?,?,?,?,?)", [self.bounds[0], self.bounds[1], self.bounds[2], self.bounds[3],
                self.levelrange[0], self.levelrange[1], self.source, self.type,
                self.current.level, self.current.x, self.current.y], function () {

                self.db.exec('COMMIT TRANSACTION;', function () {
                    self.db.close();

                    cb && cb();

                });

            });

        } catch (ex) {
            console.log(ex);
        }

    }
    //调用父类的构造函数
    EventEmitter.call(this);
};
//开始函数
TileDownloader.prototype.start = function () {

    console.log("start : ", this);

    var self = this;
    if (!fs.existsSync(this.output)) {
        fs.mkdirSync(this.output, {recursive: true});
    }
    if (!fs.existsSync(this.basePath)) {
        fs.mkdirSync(this.basePath, {recursive: true});
    }
    this.db = new sqlite.Database(path.join(this.basePath, "main.db"), sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

    this.db.on("error", function (error) {
        console.log("Getting an error : ", error);
    });

    //只创建info表，并开始事务
    var sql = "CREATE TABLE if not exists infos (minx double,miny double,maxx double,maxy double, minlevel int, maxlevel int ,  source VARCHAR(255), type  VARCHAR(20),cur_level int, cur_x int ,cur_y int);";
    sql += "CREATE UNIQUE INDEX  if not exists infos_taskkey ON  infos  (minx, miny, maxx, maxy, minlevel, maxlevel, source);BEGIN TRANSACTION;"

    try {
        this.db.exec(sql, function () {

            self.db.get("select cur_level, cur_x, cur_y  from infos where minx=? and miny = ? and  maxx = ? and maxy=? and minlevel = ? and maxlevel = ? and source = ? ", [self.bounds[0], self.bounds[1], self.bounds[2], self.bounds[3],
                    self.levelrange[0], self.levelrange[1], self.source],
                function (err, row) {

                    if (row) {

                        self._resumeTask(row);
                    }
                    if (self.type == 'terrain') {
                        got(self.url, {
                            agent: self.proxy,
                            timeout: 10000,
                            retries: 5
                        }).then(function (response) {
                            self.layerjson = JSON.parse(response.body);
                            self.url = self.url.replace('layer.json', self.layerjson.tiles[0].replace('{version}', self.layerjson.version) + "&f=TerrainTile");
                            self._start();
                        }).catch(function (error) {
                            console.log(error);
                        });
                    } else {
                        self._start();
                    }

                });


        });
    } catch (ex) {
        console.log(ex);
    }

}

//停止函数
TileDownloader.prototype.stop = function (cb) {

    var self = this;
    this._stop(function () {

        self.state = 'stoped';

        self.emit('stoped');

        cb && cb();
    });

}
TileDownloader.prototype.getFilePath = function (tile) {
    this._getFilePath(tile);
}
//原型派生
util.inherits(TileDownloader, EventEmitter);

//导出
exports.TileDownloader = TileDownloader;
