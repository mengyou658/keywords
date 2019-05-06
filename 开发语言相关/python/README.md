
#python

### 现成列表
1. 
1. 

### 教程/文章/小抄/规范/记事
1. 利用Python进行数据分析 第二版 (2017) 中文翻译笔记
https://github.com/mengyou658/pydata-notebook

###### 记事

    * install ubuntu16.04
    ```cmd
    #默认安装的有python2 和python3，先执行更新
    apt-get update
    apt-get upgrade
    #默认是python2，安装pip
    apt-get install python-pip python3-pip
    #默认使用pip来操作Python2，使用pip3来操作python3
    pip install xxx
    pip3 install xxx
    #切换python版本
        sudo update-alternatives --install /usr/bin/python python /usr/bin/python2 100
        sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 150
        #再切换python
        update-alternatives --config python
        #或者使用
        python 或者python2 或者python3
    #使用virtualenv来解决python版本问题
    
    ```
    #uwsgi+supervisor
    uwsgi python 服务器
    supervisor 服务器监控重启
    * http://www.cnblogs.com/dspace/p/5647587.html
    
    #
    ```sh
    
    supervisord -c G:\afunqi\supervisord.conf
    
    sudo service supervisor stop 停止supervisor服务
     
    sudo service supervisor start 启动supervisor服务
     
    supervisorctl shutdown #关闭所有任务
     
    supervisorctl stop|start program_name #启动或停止服务
     
    supervisorctl status #查看所有任务状态
    
    
    ```

1. Seedstars Labs Base Django React Redux Project (django react redux)
https://github.com/mengyou658/django-react-redux-base
1. A collection of interesting, subtle, and tricky Python snippets(代码片段)
https://github.com/mengyou658/wtfpython
1. django 学习参考项目
https://github.com/mengyou658/imooc-django
1. xadmin
https://github.com/mengyou658/xadmin
1. oauth2
https://github.com/evonove/django-oauth-toolkit
1. 一个令人敬畏的Django项目模板为web包括restful api 
https://github.com/nature1995/ran-django-template
1. 

### 实用 库/模块/框架
1. xadmin
https://github.com/mengyou658/xadmin
1. Natural Language Processing (NLP) with Python and Cython / python 自然语言处理工具包 
https://github.com/mengyou658/spaCy
1. 低延迟交易执行系统 
https://github.com/mengyou658/kungfu
1. Unified Generative Adversarial Networks for Multi-Domain Image-to-Image Translation （可以将表情等直接复制到相似的图像中，达到同步更改人物的影像）
https://github.com/mengyou658/StarGAN
1.  The easy way to send notifications 通过第三方的服务，发送通知  (Pushover SimplePush Slack Gmail Email (SMTP) Telegram Gitter Pushbullet Join Hipchat Zulip)
https://github.com/mengyou658/notifiers
1.  中文处理工具包
https://github.com/mengyou658/FoolNLTK
1.  The world's simplest facial recognition api for Python and the command line 世界上最简单的人脸识别库，使用 Python 或命令行，即可识别和控制人脸。该库使用 dlib 顶尖的深度学习人脸识别技术构建，在户外脸部检测数据库基准（Labeled Faces in the Wild benchmark）上的准确率高达 99.38%。
https://github.com/mengyou658/face_recognition
1. 另外一个框架
https://github.com/pallets/flask
1. HTML Parsing for Humans™ (简单的html解析工具)
https://github.com/mengyou658/requests-html
1. 多数据流实时分布式分析系统 Confluo。它可以作为网络监控和诊断框架，也可以作为时序数据库和发布订阅消息系统。作为时序数据库，它的性能比其他时序数据库高出数倍，而作为发布消息订阅系统，它的吞吐量比 Kafka 高出 4 到 10 倍。
https://github.com/ucbrise/confluo
1. 
1. 
1. 

### 完整项目/示例/demo/代码片段
1. machine learning algorithm with pure python which let pramgramer learn easily; 机器学习算法代码库
https://github.com/mengyou658/moodstyle
1. Odoo. Open Source Apps To Grow Your Business.The main Odoo Apps include an Open Source CRM, Website Builder, eCommerce, Warehouse Management, Project Management, Billing & Accounting, Point of Sale, Human Resources, Marketing, Manufacturing, Purchase Management, ... (类染之项目)
https://github.com/mengyou658/odoo
1. 'Joint 3D Face Reconstruction and Dense Alignment with Position Map Regression Network'的源代码  联合三维人脸重建和位置图回归网络密集对齐
https://github.com/YadiraF/PRNet
1. Python3网络爬虫实战：VIP视频破解助手；GEETEST验证码破解；小说、动漫下载；手scylla机APP爬取；财务报表入库；火车票抢票；抖音APP视频下载；百万英雄辅助；网易云音乐批量下载
https://github.com/Jack-Cherish/python-spider
1. UReport2是一款高性能的架构在Spring之上纯Java报表引擎，通过迭代单元格可以实现任意复杂的中国式报表。 在UReport2中，提供了全新的基于网页的报表设计器，可以在Chrome、Firefox、Edge等各种主流浏览器运行（IE浏览器除外）,打开浏览器即可完成各种复杂报表的设计制作。
https://github.com/youseries/ureport
1. 邱威傑市民服務系統 https://service.froggychiu.com Project setup using cookiecutter-django-vue
https://github.com/FroggyTaipei/froggy-service
1. 
1. 

### 测试
1. 
1. 

### UI
1. 
1. 

### 工具
1. python反编译A cross-version Python bytecode decompiler
https://github.com/rocky/python-uncompyle6
1. A modern project, package, and virtual env manager for Python （python 开发环境工具，快速创建项目，管理虚拟环境）
https://github.com/ofek/hatch
1. An instant JSON API for your SQLite databases (将 sqlite 数据暴露成一个只读的json-api)
https://github.com/mengyou658/datasette
1. Integration layer between Requests and Selenium for automation of web actions Requestium is a python library that merges the power of Requests, Selenium, and Parsel into a single integrated tool for automatizing web actions. Requestium是一个Python库，它将Requests，Selenium和Parsel的功能合并为一个集成的工具，用于自动化Web操作。
https://github.com/mengyou658/requestium
1.  python 环境管理工具 类似 bundler, composer, npm, cargo, yarn, etc.
https://github.com/mengyou658/pipenv
1.  python 性能分析工具 
https://github.com/mengyou658/snakeviz
1. Silk is a live profiling and inspection tool for the Django framework django 性能分析工具  (参考文章，http://www.iteye.com/news/32809)
https://github.com/mengyou658/silk
1. Python Cheat Sheet python 速查表/备忘录
https://github.com/mengyou658/pysheeet
1. 开源跳板机(堡垒机):认证,授权,审计,自动化运维
https://github.com/mengyou658/jumpserver
1. Scylla 是一款高质量的免费代理 IP 池工具
https://github.com/imWildCat/scylla
1. cli 展示 gif
https://github.com/google/gif-for-cli
1. 爬虫 Python Incredibly fast crawler which extracts urls, emails, files, website accounts and much more.
https://github.com/s0md3v/Photon
1. 集合了众多运维工具（puppet、cfengine、chef、func、fabric）的优点，实现了批量系统配置、批量程序部署、批量运行命令等功能 Ansible is a radically simple IT automation platform that makes your applications and systems easier to deploy. Avoid writing scripts or custom code to deploy and update your applications — automate in a language that approaches plain English, using SSH, with no agents to install on remote systems. https://docs.ansible.com/ansible/ https://www.ansible.com/
https://github.com/ansible/ansible
1. 谷歌，Naver多进程图像网络爬虫（Selenium） Google, Naver multiprocess image web crawler (Selenium)
https://github.com/YoongiKim/AutoCrawler
1. 它可以追踪、控制你家里的所有设备，并且能实现自动化控制。它支持 Amazon Fire TV、Philips Hue、Google Chromecasts 等设备，还集成了 IFTTT。  Open source home automation that puts local control and privacy first
https://github.com/home-assistant/home-assistant
1. 一个很不错的调试工具类，能打印方法每一步执行的变量变化
https://github.com/cool-RR/PySnooper