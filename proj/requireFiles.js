let fs=require('fs')

let getAppModule=(path)=>{
    fs.readdirSync(path).filter((value) => {
        if(fs.statSync(path+'/'+value).isDirectory()){
            return getAppModule(path+'/'+value)
        }else if(value.indexOf('.js')>-1){
            return value
        }
    }).map(value => require(path+'/' + value));
}

exports.getAppModule=(path)=>getAppModule(path)