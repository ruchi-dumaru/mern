
const multer=require('multer')
const fs=require('fs');
const { generateRandomString } = require('../utilities/helper');


const uploader=(type="image")=>{
  let allowedExts=['jpg','jpeg','png','gif','bmp','svg','webp']
  let size=3*1024*1024

  if(type === 'doc'){
    allowedExts=['docs','docx','csv','txt','pdf','json']
    size=5*1024*1024
  }
  else if(type ==='audio')
  {
    allowedExts=['mp3'];
    size=10*1024*1024

  }

  const fileFilter=(req,file,cb)=>{
    const ext=file.originalname.split('.').pop();
    if(allowedExts.includes(ext.toLowerCase())){
      cb(false,true)
    }else{
      cb({code:422,message:"File format not supported",status:"INVALID_FILE"})
    }
  }
  const myStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
      const tmpPath="./public/uploads";
      if(!fs.existsSync(tmpPath)){
        fs.mkdirSync(tmpPath,{recursive:true})
      }
      cb(null,tmpPath)
    },
    filename:(req,file,cb)=>{
      const fileName=generateRandomString(15)+"_"+file.originalname;
      cb(null,fileName)
    }
  })
  return multer({
    storage:myStorage,
    fileFilter:fileFilter,
    limits:{
      fileSize:size,
    }
  })
}

module.exports=uploader
