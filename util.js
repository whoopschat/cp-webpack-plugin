const fs = require('fs');
const path = require('path');

function mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
    return false;
}

function listSync(src) {
    let entrysList = [];
    const fetchFile = (file) => {
        if (!fs.existsSync(file)) {
            return;
        }
        let fileStat = fs.statSync(file);
        if (fileStat.isDirectory()) {
            const fileList = fs.readdirSync(file);
            if (!fileList.length) {
                return;
            }
            fileList.forEach(item => {
                fetchFile(path.join(file, `./${item}`))
            })
        } else {
            entrysList.push(path.relative(src, file));
        }
    }
    fetchFile(src);
    return entrysList;
}

function copyFileSync(src, dst, filter, map) {
    let content = null;
    if (!filter || filter(src)) {
        content = fs.readFileSync(src);
    }
    if (!content){
        return;
    }
    if (map) {
        dst = map(dst);
    }
    mkdirsSync(path.dirname(dst));
    fs.writeFileSync(dst, content);
}

function copyDirSync(src, dst, filter, map) {
    if (emptySync(src)) {
        return;
    }
    listSync(src).forEach(file => {
        copyFileSync(path.join(src, file), path.join(dst, file), filter, map);
    })
}

function copySync(src, dst, filter, map) {
    if (!fs.existsSync(src)) {
        return;
    }
    let fileStat = fs.statSync(src);
    if (fileStat.isDirectory()) {
        copyDirSync(src, dst, filter, map)
    } else {
        copyFileSync(src, dst, filter, map)
    }
}

function emptySync(dir) {
    if (!fs.existsSync(dir)) {
        return true;
    }
    let fileStat = fs.statSync(dir);
    if (fileStat.isDirectory()) {
        const fileList = fs.readdirSync(dir);
        if (!fileList.length) {
            return true;
        }
    }
    return false;
}

module.exports = exports = {
    emptySync,
    copyFileSync,
    copyDirSync,
    copySync,
    mkdirsSync,
    listSync,
}