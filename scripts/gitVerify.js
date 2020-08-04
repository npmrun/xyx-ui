const fs = require('fs')
const cm = require('../changelog.config')
const committMsgPath = process.argv[2]
let msg = fs.readFileSync(committMsgPath,{encoding: 'utf-8'})

const pattern =Object.keys(cm.types).join("|")


if(!new RegExp(`^(${pattern}):`).test(msg)){
    console.log(msg);
    if (!msg.includes("alpha内测版本")&&!msg.includes("beta公测版本")&&!msg.includes("stable稳定版本")) {
        throw "请规范化提交"
    }    
}