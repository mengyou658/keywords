 const downloadTile = require('./tiledownloader.js');



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

 var source = dataSources[0].sources[0];


 var downloader = new downloadTile.TileDownloader({
     bounds: [113.9,39.9,114,40],   //下载范围
     levelrange: [1, 18],  //下载级别
     output: 'd:\\downloadtest.pak',  //存储的sqlite 下载结果可以直接在cesiumlab发布
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
 });

 downloader.on('started', function() {

     console.log('started:', this.allTileCount, this.maxgot);
 });

 downloader.on('progress', function() {
    //  console.log('progress:' + p);
 });

 downloader.on('speed', function() {
     var progress = this.finishedCount / this.allTileCount;

     console.log('progress:' + progress);

 });

 downloader.on('finished', function() {

     console.log('finished:');
 });

 downloader.on('stoped', function() {

     console.log('stoped:');
 });

 downloader.start();
