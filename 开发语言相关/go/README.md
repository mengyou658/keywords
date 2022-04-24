# go语言

[https://github.com/mengyou658/keywords/tree/master/%E5%BC%80%E5%8F%91%E8%AF%AD%E8%A8%80%E7%9B%B8%E5%85%B3/go](https://github.com/mengyou658/keywords/tree/master/%E5%BC%80%E5%8F%91%E8%AF%AD%E8%A8%80%E7%9B%B8%E5%85%B3/go)

### 环境

windows对应的设置环境变量即可

```cmd
# 推荐使用 goproxy.cn  由七牛云提供(只需设置一次)
go env -w GOPROXY=https://goproxy.cn,direct
# 可以不开启module，大部分go老模块不支持
export GO111MODULE=on
export all_proxy=https://goproxy.io
上面的方式如果有问题,使用git-bash执行golang.sh来解决
```

### 现成列表

1. [Uber Go 语言编码规范中文版. The Uber Go Style Guide https://github.com/xxjwxc/uber_go_guide_cn](https://github.com/xxjwxc/uber_go_guide_cn)
2. 为互联网IT人打造的中文版awesome-go
   [https://github.com/hackstoic/golang-open-source-projects](https://github.com/hackstoic/golang-open-source-projects)
3. 学习路线
   [https://github.com/Quorafind/golang-developer-roadmap-cn](https://github.com/Quorafind/golang-developer-roadmap-cn)
4. 学习教程
   [https://github.com/Unknwon/the-way-to-go_ZH_CN/blob/master/eBook/preface.md](https://github.com/Unknwon/the-way-to-go_ZH_CN/blob/master/eBook/preface.md)
5. 编写和优化Go代码
   [https://github.com/dgryski/go-perfbook/blob/master/performance-zh.md](https://github.com/dgryski/go-perfbook/blob/master/performance-zh.md)
6. awesome
   [https://github.com/hyper0x/awesome-go-China/blob/master/zh_CN/README.md#web-frameworks](https://github.com/hyper0x/awesome-go-China/blob/master/zh_CN/README.md#web-frameworks)
7. 一步一步教你，做Zinx框架的项目制作采用编码和学习教程同步进行，将开发的全部递进和迭代思维带入教程中，而不是一下子给大家一个非常完整的框架去学习，让很多人一头雾水，不知道该如何学起
   [https://github.com/aceld/zinx](https://github.com/aceld/zinx)
8. 数据结构和算法必知必会的50个代码实现
   [https://github.com/wangzheng0822/algo](https://github.com/wangzheng0822/algo)
9. 从问题切入，串连 Go 语言相关的所有知识，融会贯通。
   [https://github.com/qcrao/Go-Questions](https://github.com/qcrao/Go-Questions)
10. go 入门
    [https://chai2010.cn/advanced-go-programming-book/ch2-cgo/ch2-01-hello-cgo.html](https://chai2010.cn/advanced-go-programming-book/ch2-cgo/ch2-01-hello-cgo.html)
11. [https://www.zhihu.com/question/482042789](https://www.zhihu.com/question/482042789)
12. [https://github.com/xxjwxc/uber_go_guide_cn](https://github.com/xxjwxc/uber_go_guide_cn)
13. 

### cheatsheet 备忘录

1.
1.

### 教程/文章/小抄/规范/记事

1. Dave Cheney 的教学记录，完整介绍了如何开发、测试、调试高性能 Go
   程序的过程，包括所有周边工具的使用和相关运行时的概念及深入分析 https://dave.cheney.net/high-performance-go-workshop/gopherchina-2019.html
   [https://github.com/davecheney/high-performance-go-workshop](https://github.com/davecheney/high-performance-go-workshop)
2. [https://mp.weixin.qq.com/s/KqNHNs75CimBMX9cF2zwZw](https://mp.weixin.qq.com/s/KqNHNs75CimBMX9cF2zwZw)
3. 
4. 

### 实用 库/模块/框架

1. Golang framework for robotics, drones, and the Internet of Things (IoT)  iot控制框架
   [https://github.com/hybridgroup/gobot](https://github.com/hybridgroup/gobot)
2. mysql proxy
   Gaea是小米中国区电商研发部研发的基于mysql协议的数据库中间件，目前在小米商城大陆和海外得到广泛使用，包括订单、社区、活动等多个业务。Gaea支持分库分表、sql路由、读写分离等基本特性，更多详细功能可以参照下面的功能列表。其中分库分表方案兼容了mycat和kingshard两个项目的路由方式。Gaea在设计、实现阶段参照了mycat、kingshard和vitess，并使用tidb
   parser作为内置的sql parser，在此表达诚挚感谢
   [https://github.com/XiaoMi/Gaea](https://github.com/XiaoMi/Gaea)
3. Go runtime source code analysis(zh-cn)
   [https://github.com/cch123/golang-notes](https://github.com/cch123/golang-notes)
4. An entity framework for Go 图形 图像 orm 查询存储工具库
   [https://github.com/facebookincubator/ent](https://github.com/facebookincubator/ent)
5. The fantastic ORM library for Golang, aims to be developer friendly
   [https://github.com/jinzhu/gorm](https://github.com/jinzhu/gorm)
6. Jupiter是douyu开源的面向服务治理的Golang微服务框架
   [https://github.com/douyu/jupiter](https://github.com/douyu/jupiter)
7. [safe and easy casting from one type to another in Go https://github.com/spf13/cast](https://github.com/spf13/cast)
8. [nps是一款轻量级、高性能、功能强大的内网穿透代理服务器。目前支持tcp、udp流量转发，可支持任何tcp、udp上层协议（访问内网网站、本地支付接口调试、ssh访问、远程桌面，内网dns解析等等……），此外还支持内网http代理、内网socks5代理、p2p等，并带有功能强大的web管理端 https://github.com/ehang-io/nps](https://github.com/ehang-io/nps)
9. [Proxy是golang实现的高性能http,https,websocket,tcp,socks5代理服务器,支持内网穿透,链式代理,通讯加密,智能HTTP,SOCKS5代理,黑白名单,限速,限流量,限连接数,跨平台,KCP支持,认证API https://github.com/snail007/goproxy](https://github.com/snail007/goproxy)
10. [A fast, well-tested and widely used WebSocket implementation for Go. https://github.com/gorilla/websocket](https://github.com/gorilla/websocket)
11. [一个示例项目，作者介绍如何从零开始实现一个小型的时序数据库（TSDB），也就是专门用于时间序列的数据库 mandodb](https://github.com/chenjiandongx/mandodb)
12. [go 实现的压测工具，ab、locust、Jmeter压测工具介绍【单台机器100w连接压测实战】 https://github.com/link1st/go-stress-testing](https://github.com/link1st/go-stress-testing)
13. [Go library for decoding generic map values into native Go structures and vice versa. https://github.com/mitchellh/mapstructure](https://github.com/mitchellh/mapstructure)
14. [A lightweight stream processing library for Go https://github.com/reugn/go-streams](https://github.com/reugn/go-streams)
15. [A Lodash-style Go library based on Go 1.18+ Generics (map, filter, contains, find...) https://github.com/samber/lo](https://github.com/samber/lo)
16. [ioc 框架 https://hub.fastgit.xyz/go-spring/go-spring](https://hub.fastgit.xyz/go-spring/go-spring)
17. 
18. 
19. 

### 完整项目/示例/demo/代码片段

1. 也简单，可以作为基础的一个参考，beego + vue前后端分离个人博客
   [https://github.com/louyan/go-vue-blog](https://github.com/louyan/go-vue-blog)
2. 基于Golang解决的长连接并发服务器框架 一步一步教你，做Zinx框架的项目制作采用编码和学习教程同步进行，将开发的全部递进和迭代思维带入教程中，而不是一下子给大家一个非常完整的框架去学习，让很多人一头雾水，不知道该如何学起
   [https://github.com/aceld/zinx](https://github.com/aceld/zinx)
3. 成果、价值、进度管理系统——基于golang
   go语言（beego框架），本系统方便为工程师团队统计工作量，进行成果校审流程，对工程师进行价值评测，据此进行效益分配。系统既可以运行于个人电脑，也可以放到服务器上。本系统包含了EngineerCMS所有功能。
   [https://github.com/mengyou658/meritms](https://github.com/mengyou658/meritms)
4. 工程师知识管理系统：基于golang
   go语言（beego框架）。每个行业都有自己的知识管理系统，engineercms旨在为土木工程师们打造一款适用的基于web的知识管理系统。它既可以用于管理个人的项目资料，也可以用于管理项目团队资料；它既可以运行于个人电脑，也可以放到服务器上。支持onlyoffice实时文档协作，直接在线编辑dwg文件、office文档，预览PDF文件。通用的文档流程设置。手机端配套小程序，微信搜索“珠三角设代”或“青少儿书画”即可呼出小程序。 https://zsj.itdos.com/
   [https://github.com/3xxx/engineercms](https://github.com/3xxx/engineercms)
5. 一个简单直观的bug管理系统，但不仅仅只是一个bug管理系统，IT人员工作流程，go+vue
   [https://github.com/hyahm/ITflow](https://github.com/hyahm/ITflow)
6. 简单，界面还可以。 beego+layui+mysql 开发 简洁美观的个人博客系统
   [https://github.com/Echosong/beego_blog](https://github.com/Echosong/beego_blog)
7. 太简单，太老了，暂时不用。基于beego框架的cms系统
   [https://github.com/linbaozhong/go-cms](https://github.com/linbaozhong/go-cms)
8. moshopserver小程序商城后台系统
   [https://github.com/tumobi/nideshop-mini-program](https://github.com/tumobi/nideshop-mini-program)
9. 使用的前端技术有点老，暂时不用 beego RBAC 权限 文章 简单的cms blog
   [https://github.com/mengyou658/rabbit](https://github.com/mengyou658/rabbit)
10. OPMS项目+OA管理系统 协同办公 beego
    [https://github.com/lock-upme/OPMS](https://github.com/lock-upme/OPMS)
11. 基于go开发的一款新的开发语言，可以参考从头开始学习语言的设计
    [https://github.com/vlang/v](https://github.com/vlang/v)
12. BookStack，基于MinDoc，使用Beego开发的在线文档管理系统，功能类似Gitbook和看云
    [https://github.com/TruthHun/BookStack](https://github.com/TruthHun/BookStack)
13. Golang实现的基于beego框架的接口在线文档管理系统 https://www.iminho.me
    [https://github.com/lifei6671/mindoc](https://github.com/lifei6671/mindoc)
14. 一个轻量级网络混淆代理，基于 SOCKS5 协议，可用来代替 Shadowsocks
    [https://github.com/gwuhaolin/lightsocks](https://github.com/gwuhaolin/lightsocks)
15. 从Chrome中获取自动保存的用户名密码
    [https://github.com/cckuailong/HackChrome](https://github.com/cckuailong/HackChrome)
16. 
17. 
18. 
19. 
20. 

### 测试

1.
1.

### UI

1.
1.

### 工具

1. [Go一些常用的工具函数收集、实现和整理 https://github.com/gookit/goutil](https://github.com/gookit/goutil)
2. [Go library for decoding generic map values into native Go structures and vice versa. https://github.com/mitchellh/mapstructure](https://github.com/mitchellh/mapstructure)
3. [Optional is a library of optional Go types https://github.com/markphelps/optional](https://github.com/markphelps/optional)
4. 静态网站生成
   [https://github.com/gohugoio/hugo](https://github.com/gohugoio/hugo)
5. gitlab 精简版本
   [https://github.com/go-gitea/gitea](https://github.com/go-gitea/gitea)
6. Vegeta是一个多功能的HTTP负载测试工具，需要以恒定的请求率来钻取HTTP服务。它既可以用作命令行实用程序，也可以用作库
   [https://github.com/tsenart/vegeta](https://github.com/tsenart/vegeta)
7. GoReplay是一个开源工具，用于捕获实时HTTP流量并将其重放到测试环境中，以便使用真实数据持续测试您的系统。它可用于增加对代码部署，配置更改和基础结构更改的信心GoReplay is an open-source tool
   for capturing and replaying live HTTP traffic into a test environment in order to continuously test your system with
   real data. It can be used to increase confidence in code deployments, configuration changes and infrastructure
   changes.
   [https://github.com/buger/goreplay](https://github.com/buger/goreplay)
8. https://staticcheck.io的静态分析工具的集合
   [https://github.com/dominikh/go-tools](https://github.com/dominikh/go-tools)
9. Kubernetes Native Serverless Framework https://kubeless.io
   [https://github.com/kubeless/kubeless](https://github.com/kubeless/kubeless)
10. go 命令行dashboard工具 The personal information dashboard for your terminal
    [https://github.com/wtfutil/wtf](https://github.com/wtfutil/wtf)
11. 一款轻量级、功能强大的内网穿透代理服务器。支持tcp、udp流量转发，支持内网http代理、内网socks5代理，同时支持snappy压缩、站点保护、加密传输、多路复用、header修改等。支持web图形化管理，集成多用户模式。
    [https://github.com/cnlh/nps](https://github.com/cnlh/nps)
12. auto generate sql from gorm model struct
    [https://github.com/liudanking/gorm2sql](https://github.com/liudanking/gorm2sql)
13. go 爬虫工具
    [https://github.com/hakluke/hakrawler](https://github.com/hakluke/hakrawler)
14. fate 命运 起名 算命 宝宝起名
    [https://github.com/godcong/fate](https://github.com/godcong/fate)
15. kubernetes高可用安装工具，一条命令，离线安装，包含所有依赖，内核负载不依赖haproxy keepalived,纯golang开发,99年证书,支持v1.16.4 v1.15.7 v1.14.10
    v1.17.0! https://sealyun.com
    [https://github.com/fanux/sealos](https://github.com/fanux/sealos)
16. [Sharingan（写轮眼）是一个基于golang的流量录制回放工具，适合项目重构、回归测试等。 https://github.com/didi/sharingan](https://github.com/didi/sharingan)
17. [KubePi 是一款简单易用的开源 Kubernetes 可视化管理面板 https://github.com/KubeOperator/KubePi](https://github.com/KubeOperator/KubePi)
18. [https://github.com/proferosec/log4jScanner](https://github.com/proferosec/log4jScanner)
19. [除了增加面向 IoT 和边缘计算的功能，InfluxDB 公司还启动了创新存储引擎的新项目，重新构建对存储的想象。他们宣布了下一代存储引擎的计划 —— InfluxDB I0x。InfluxDB I0x 是功能强大的新型存储引擎，旨在执行随着时间推移不断增加的查询工作负载。InfluxDB I0x 基于 Rust 语言开发，并使用了 Apache Arrow 和柱列式数据结构 Scalable datastore for metrics, events, and real-time analytics https://github.com/influxdata/influxdb](https://github.com/influxdata/influxdb)
20. [https://mholt.github.io/json-to-go/](https://mholt.github.io/json-to-go/)
21. 

### web 框架

1. [基于GF(Go Frame)的后台管理系统 https://github.com/tiger1103/gfast](https://github.com/tiger1103/gfast)
1. [基于gin+vue搭建的后台管理系统框架，集成jwt鉴权，权限管理，动态路由，分页封装，多点登录拦截，资源权限，上传下载，代码生成器，表单生成器，通用工作流等基础功能，五分钟一套CURD前后端代码，目前已支持VUE3，欢迎issue和pr~ https://github.com/flipped-aurora/gin-vue-admin](https://github.com/flipped-aurora/gin-vue-admin)
1. [https://gitee.com/yunjieg/yjgo](https://gitee.com/yunjieg/yjgo)
1. [基于 Gin 进行模块化设计的 API 框架，封装了常用功能，使用简单，致力于进行快速的业务研发。比如，支持 cors 跨域、jwt 签名验证、zap 日志收集、panic 异常捕获、trace 链路追踪、prometheus 监控指标、swagger 文档生成、viper 配置文件解析、gorm 数据库组件、graphql 查询语言、errno 统一定义错误码、gRPC 的使用 等等。 https://github.com/xinliangnote/go-gin-api](https://github.com/xinliangnote/go-gin-api)
1. https://github.com/gin-gonic/gin
1. https://github.com/astaxie/beego

### php 转 go

1. 简单的代码，可以把php转成go代码
   [https://github.com/lSimul/php2go.git ](https://github.com/lSimul/php2go.git )


1. 将php转成 ast php的解析器
   [https://github.com/z7zmey/php-parser](https://github.com/z7zmey/php-parser)
1. Use Golang to implement PHP's common built-in functions. go实现php内置函数
   [https://github.com/syyongx/php2go](https://github.com/syyongx/php2go)
   [https://github.com/peihuwang/php2go](https://github.com/peihuwang/php2go)

1. ast to go source file github.com/fatih/astrewrite

1. go 自带的 把 go代码 转 ast
   [https://golang.org/pkg/go/parser/](https://golang.org/pkg/go/parser/)
1. go 自带的 把 ast 转成go代码
   [https://golang.org/pkg/go/ast/](https://golang.org/pkg/go/ast/)

##### 以下都很久未更新

1. go 代码生成 注释显示位置不对的问题
   [https://github.com/dave/dst](https://github.com/dave/dst)
1. php 解析器
   [https://github.com/stephens2424/php](https://github.com/stephens2424/php)
1. go 中执行php代码
   [https://github.com/deuill/go-php](https://github.com/deuill/go-php)
1. 多语言相互转换 parser generator
   [https://github.com/antlr/antlr4](https://github.com/antlr/antlr4)
1. 多语言相互转换 parser generator
   [https://github.com/github/semantic](https://github.com/github/semantic)


### gop go plus 
1. [https://hub.fastgit.xyz/goplus/gop](https://hub.fastgit.xyz/goplus/gop)
