// requiring required files
const Article = require('../models/Article');
const Journal = require ('../models/Journal');
const User = require ("../models/User");

// get route 
const getJournal = (req, res)=>{
    // console.log(req.params.id);
    // console.log(req.headers);
    Journal.find({user:{$in:[req.params.id]}})
    .sort({date:-1})
    .then(journals =>res.json(journals) )
    .catch(err => res.json(err));
    
    // try {
    //     User.findOne({_id:req.params.id}).populate("journals")
       
    //     .then(dbJournal=>{
    //         const journals = dbJournal.journals;
    //        //const journal = journals.sort({date: -1});
    //         console.log(journals)
    //         res.json(journals);
    //     }) 
    // } catch (error) {
    //     res.json(error)
    //  }

}
// post or creating journal
const createJournal =  (req, res)=>{
     console.log(req.body);
     console.log(req.headers);
    // if(req.body.userId === undefined) return res.status(500).json({message:"user is not authenticated"});
    try {
        const result = Journal.create({
            name : req.body.journalName,
            user:req.headers.userid
        })
        .then(({ _id }) => User.findOneAndUpdate({_id:req.headers.userid}, { $push: { journals: _id } }, { new: true }))
        .then()
        res.json(result);
    } catch (error) {
        res.json(error)
    }
   
}
const updateJournal =  (req, res)=>{
    console.log(req.body);
   
}
const uploadImage = (req, res)=>{
    console.log(req.body)
}
const deleteJournal =  (req, res)=>{
    // console.log(req.params.id);
    const userId = req.headers.userid;
    const journalId = req.params.id;
    const journal = Journal.findOneAndDelete({_id:req.params.id}, (err, res)=>{
        if(err){
        res.json(err)
        }
        User.findOneAndUpdate({_id:userId}, {$pull:{journals: journalId}}, (err, res)=>{
            if (err) {
               console.log(err)
            }
           console.log(res)
        })
    })
   Article.deleteMany({journal:{$in:[req.params.id]}}, (err, res)=>{
       if(err){
           console.log(err)
       }
       console.log(res)
   })
   
}
module.exports={getJournal, createJournal, updateJournal, deleteJournal, uploadImage};