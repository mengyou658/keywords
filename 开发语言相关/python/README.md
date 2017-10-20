#python
### 现成列表
1. 
1. 
### 教程/文章/小抄/规范/记事
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
1. 
1. 
### 实用 库/模块/框架
1. xadmin
https://github.com/mengyou658/xadmin
1. 
### 完整项目/示例/demo/代码片段
1. 
1. 
### 测试
1. 
1. 
### UI
1. 
1. 
### 工具
1. A modern project, package, and virtual env manager for Python （python 开发环境工具，快速创建项目，管理虚拟环境）
https://github.com/ofek/hatch
1. 
1. 
