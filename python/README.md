#python
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
```