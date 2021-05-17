// requiring required files
const Journal = require ('../models/Journal');
const Article = require ("../models/Article");

// get route 
const getArticle = (req, res)=>{
    console.log(req.params.id);
    try {
        Journal.findOne({_id:req.params.id}).populate("articles")
        .then(dbArticle=>{
            console.log(dbArticle)
            res.json(dbArticle);
        }) 
    } catch (error) {
        console.log(error)
     }

}
// post or creating journal
const createArticle =  (req, res)=>{
    console.log(req.body);
    if(req.body.journalId === undefined) return res.status(500).json({message:"please specify the journal you want to put"});
    try {
        const result = Article.create({
            title : req.body.title,
            body:req.body.body
        })
        .then(({ _id }) => Journal.findOneAndUpdate({_id:req.body.journalId}, { $push: { articles: _id } }, { new: true }))
        .then()
        res.json(result);
    } catch (error) {
        console.log(error)
    }
   
}
const updateArticle =  (req, res)=>{
    console.log(req.body);
   
}
const deleteArticle =  (req, res)=>{
    console.log(req.params.id);
    console.log(req.headers.journalid);
    const journalId = req.headers.journalid;
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
        
    }
   
   
}
module.exports={getArticle, createArticle, updateArticle, deleteArticle};