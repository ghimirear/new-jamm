const Image = require ("../models/Image");
const fs = require("fs");
const path = require ('path')
// setting up the multer
var multer = require('multer');
const Article = require("../models/Article");
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../client/public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 var uploadPath = require("../path")
var upload = multer({ storage: storage });
const uploadImage = (req, res)=>{
    
        console.log("file should be this", req.body.articleId);
        console.log(req.files)
        if (req.files === undefined || req.files === null) {
          return res.status(400).jason({msg:"no file uploaded"})
        }
        const file = req.files.file;
        file.mv(`${uploadPath}${file.name}`, err =>{
          if(err){
            console.log(err)
            return res.status(500).send(err)
          }
          res.json({fileNmae:file.name, filePath :`/uploads/${file.name}`})
        })
      
 // console.log(req.body);
  console.log(file)
   const result = Image.create({
       name: file.name,
       article:[req.body.articleId],
       img: {
        data: file.data,
        contentType: 'image/png',
        path : `${uploadPath}${file.name}`
    }, 
   }).then(({_id})=> Article.findOneAndUpdate({_id:req.body.articleId}, {$push:{image: _id}}, {new:true}))
   .catch((err) => {console.log(err)})
};

module.exports = {uploadImage};