const fs = require('fs')
const path = require('path')
var readline = require('readline');

function readDirList(basePath, dataList, excludes) {
    var pa = fs.readdirSync(basePath);
    pa.forEach((it, idx) => {
        if (excludes.indexOf(it) > -1) {
            return;
        }
        let filePath = basePath + "/" + it;
        var info = fs.statSync(filePath)
        var itData = {
            name: it,
            path: filePath,
            child: []
        };
        if (info.isDirectory()) {
            itData.dirFlag = true;
            dataList.push(itData);
            readDirList(filePath, itData.child, excludes);
        } else if (it.toLowerCase().endsWith(".md")) {
            itData.dirFlag = false;
            dataList.push(itData);
        }
    })
}

async function readFirstLine(path) {
    return new Promise((resolve, reject) => {
        var fRead = fs.createReadStream(path);
        var objReadline = readline.createInterface({
            input: fRead
        });
        objReadline.on('line', function (line) {
            if (line && line.trim() != '') {
                resolve(line);
            }
        });
    })
}

function genEmptyStrs(nums) {
    var res = [];
    for (var i = 0; i < nums; i++) {
        res.push(" ");
    }
    return res.join("");
}

async function genMuluStr(data, depths, resList) {
    if (!data) {
        return;
    }
    var name = '';
    if (data.dirFlag) {
        name = data.name;
    } else if (data.name.toLowerCase().endsWith('readme.md')) {
        name = await readFirstLine(data.path);
        name = name.replace('#', '').trim();
    } else {
        name = data.name.replace('.md', '');
    }

    let str = data.dirFlag ? `* ${name}` : `* [${name}](${data.path.replace('./', '')})`;
    resList.push(genEmptyStrs(depths * 2) + str);
    depths++;
    const child = data.child;
    if (!child || !child.length) {
        return;
    }
    for (var i of child) {
        await genMuluStr(i, depths, resList);
    }
}

async function main() {
    var basePath = ".";
    var dataList = [];
    let excludes = ['.git', '.idea'];
    readDirList(basePath, dataList, excludes);

    var resList = [];
    console.log('data:', JSON.stringify(dataList, null, 2));
    for (var it of dataList) {
        // 遍历所有文件和文件夹
        var idx = 0;
        await genMuluStr(it, idx, resList);
    }

    console.log(resList.join('\n'));
}

main();
