const express = require('express');
const path = require("path");
const downloadTile = require('./tiledownloader');

var currTileDownloader = null;

var dataSources = [{
  type: '影像数据',
  sources: [{
    name: '谷歌地图影像',
    url: 'http://www.google.cn/maps/vt?lyrs=s&x={x}&y={y}&z={z}',
    img: 'test.jpg',
    desc: '无偏移'
  }, {
    name: '谷歌地图影像上标注',
    url: 'http://www.google.cn/maps/vt?lyrs=h&gl=CN&x={x}&y={y}&z={z}',
    img: 'test.jpg',
    desc: '有偏移'
  }, {
    name: '谷歌地图带标注影像',
    url: 'http://www.google.cn/maps/vt?lyrs=s,h&gl=CN&x={x}&y={y}&z={z}',
    img: 'test.jpg',
    desc: '有偏移'
  }, {
    name: '谷歌地图',
    url: 'http://www.google.cn/maps/vt?lyrs=m&gl=CN&x={x}&y={y}&z={z}',
    img: 'test.jpg',
    desc: '有偏移'
  }, {
    name: '天地图影像',
    url: 'http://t4.tianditu.cn/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
    img: 'test.jpg',
    desc: '无偏移，墨卡托投影'
  }, {
    name: '天地图影像上标注',
    url: 'http://t4.tianditu.cn/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={z}&TileRow={y}&TileCol={x}&style=default&format=tiles',
    img: 'test.jpg',
    desc: '无偏移，墨卡托投影'
  }, {
    name: '天地图地图',
    url: 'http://t6.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}',
    img: 'test.jpg',
    desc: '无偏移，墨卡托投影'
  }, {
    name: '天地图地图标注',
    url: 'http://t3.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}',
    img: 'test.jpg',
    desc: '无偏移，墨卡托投影'
  }, {
    name: '高德在线地图',
    url: 'http://webrd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}',
    img: 'test.jpg',
    desc: '有偏移，墨卡托投影'
  }]
}, {
  type: '地形数据',
  sources: [{
    name: 'Agi全球地形',
    url: 'http://assets.agi.com/stk-terrain/world/layer.json',
    img: 'test.jpg',
    desc: '建议本机安装VPN',
    type: 'terrain'
  }
    /*,{
            name: '超图地形',
            url: 'https://www.supermapol.com/iserver/services/3D-stk_terrain/rest/realspace/datas/info/data/path/layer.json',
            img: 'test.jpg',
            desc: '可能是超图下载的Agi官网地形',
            type: 'terrain'
        }*/]
}];

const init = function (app) {
  var router = express.Router();
  router.get('/maps/vt', function (req, res) {
    var search = req.body;
    //  服务
    let file = downloadTile.TileDownloader.getFilePath({
      x: search.x,
      y: search.y,
      level: search.z,
    });
    res.download(file);
  });

  router.post('/maps/down/start', function (req, res) {

    try {
      var search = req.body;
      var basePath = path.join(__dirname, '../../img/tilemap');
      var outPut = path.join(__dirname, '../../img/tilemap');
      if (search['downloadDir']) {
        outPut = path.join(search['downloadDir']);
      }
      console.log("basePath", {outPut, basePath});
      console.log("maps start", dataSources[0].sources[search.dataSource])
      var source = search.dataSource ? dataSources[0].sources[Number(search.dataSource)] : null;
      if (!search['xyStart'] || !search['xyEnd'] || !search['rangeStart'] || !search['rangeEnd'] || !source
        || search['xyStart'].indexOf(",") < 0
        || search['xyEnd'].indexOf(",") < 0
      ) {
        console.log("maps start error", "参数错误")
        res.json({
          success: 0,
          msg: '参数错误'
        });
        return
      }

      if (null != currTileDownloader) {
        currTileDownloader.stop();
        currTileDownloader = null;
      }
      var config = {
        bounds: search['xyStart'].split(',').concat(search['xyEnd'].split(",")),   //下载范围
        levelrange: [Number(search['rangeStart']), Number(search['rangeEnd'])],  //下载级别
        output: outPut,  //存储的sqlite 下载结果可以直接在cesiumlab发布
        basePath: basePath,  //存储的sqlite 下载结果可以直接在cesiumlab发布
        source: source.name,   //名称
        type: source.type,   //类型，默认为影像
        //maxgot: 100,   //设置最大下载线程，默认是100，对于地形数据最好少一些
        url: source.url,
        proxy:undefined,   //默认不需要代理，如果下载官网地形，那么按下面的设置
        /*
        proxy: {
            host: 'localhost',
            port: 1080
        }*/
      }
      console.log("map start config", config);
      currTileDownloader = new downloadTile.TileDownloader(config);

      currTileDownloader.start();

      res.json({
        success: 1,
      });
    } catch (e) {
      console.log("error: " + e.message, e);
      res.json({
        success: 0,
        msg: '系统错误'
      });
    }

  });


  router.post('/maps/down/stop', function (req, res) {
    var search = req.body;
    if (null == currTileDownloader) {
      res.json({
        success: 0,
        msg: '请先调用启动参数'
      });
      return;
    }

    currTileDownloader.stop();

    res.json({
      success: 1,
    });
  });


  router.get('/maps/down/state', function (req, res) {
    var search = req.query.search;
    if (null == currTileDownloader) {
      res.json({
        success: 0,
        msg: '请先调用启动参数'
      });
      return;
    }

    var data = {
      allTileCount: currTileDownloader.allTileCount,
      finishedCount: currTileDownloader.finishedCount,
      maxgot: currTileDownloader.maxgot,
      progress: currTileDownloader.finishedCount / currTileDownloader.allTileCount,
      state: currTileDownloader.state
    };

    res.json({
      success: 1,
      data
    });
  });


  app.use('/api', router);
}

module.exports = init
