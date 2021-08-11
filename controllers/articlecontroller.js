// requiring required files
const Journal = require ('../models/Journal');
const Article = require ("../models/Article");


// get route 
const getArticle = (req, res)=>{
     Article.find({journal:{$in:[req.params.id]}}).populate("image")
     .then(dbArticles =>res.json(dbArticles) )
     .catch(err => res.json(err));
}
// post or creating journal
const createArticle =  (req, res)=>{
    // console.log(req.body);
    if(req.body.journalId === undefined) return res.status(500).json({message:"please specify the journal you want to put"});
    try {
        const result = Article.create({
            title : req.body.title,
            body:req.body.body,
            journal:[req.body.journalId]
        })
        .then(({ _id }) => Journal.findOneAndUpdate({_id:req.body.journalId}, { $push: { articles: _id } }, { new: true }))
        .then()
        res.json(result);
    } catch (error) {
        console.log(error)
    }
   
}
const updateArticle =  (req, res)=>{
    upload.single('image', (req, res, next)=>{
        var obj = {
            name: req.body.name,
            desc: req.body.desc,
            img: {
                data: fs.readFileSync(path.join(__dirname + '/client/public/uploads/' + req.file.filename)),
                contentType: 'image/png'
            }
        }
        Article.findByIdAndUpdate({_id:req.body.articleId}, obj, (err, res)=>{
            if (err) {
                console.log(err);
            }
            console.log(res)
        })
    })
  
}
const uploadImage = (req, res)=>{
    console.log(req.body)
}
const deleteArticle =  (req, res)=>{
    console.log(req.params.id);
    console.log(req.headers.journalid);
    let journalId;
    Article.findOne({_id:req.params.id}, (err, result)=>{
        if(err){
            console.log(error)
        }
        console.log( "result of fthe request"+ result.journal)
       let journal = result.journal;
        for (let i = 0; i < journal.length; i++) {
            journalId = journal[0];
            
        }
    })
    try {
     const result = Article.findOneAndDelete({_id:req.params.id}, (err, result)=>{
         if(err){
            console.log(err)
         }
         Journal.findOneAndUpdate({_id:journalId}, {$pull : {articles:req.params.id}}, (err, res)=>{
            if(err){
                console.log(err)
            }
            console.log(res)
         }) 
     })
       .then( res.json(result))
        
    } catch (error) {
        console.log(error);
    }

   
   
}
module.exports={getArticle, createArticle, updateArticle, deleteArticle, uploadImage};