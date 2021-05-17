// requiring files and model
const User = require('../models/User');
const Quote = require ("../models/Quote");

//get all the quotes
const getQuotes = (req,res)=>{
    // console.log(req.params.id);
    try {
        User.findOne({_id:req.params.id}).populate("quotes")
        .then(dbQuotes=>{
            // console.log(dbQuotes.quotes)
            res.json(dbQuotes.quotes);
        }) 
    } catch (error) {
        res.json(error)
     }

}
// creating quote or saving quote to database
const createQuote = (req, res)=>{
    //console.log(req.body)
    try {
        const result = Quote.create({
            name : req.body.quote,
            user:[req.headers.userid]
        })
        .then(({ _id }) => User.findOneAndUpdate({_id:req.headers.userid}, { $push: { quotes: _id } }, { new: true }))
       // .then()
        res.json(result);
    } catch (error) {
        res.json(error)
    }
}
// deleting the quote
const deleteQuote = (req, res)=>{
    const userId = req.headers.userid;
    try {
        const result = Quote.findOneAndDelete({Id:req.params.id}, (err, result)=>{
           if(err){
              console.log(err)
           } 
           res.json(result)
           User.findOneAndUpdate({_id:userId}, {$pull:{quotes: req.params.id}}, (err, res)=>{
               if (err) {
                  console.log(err)
               }
               console.log(res)
           })
        })
        res.json(result)
    } catch (error) {
        console.log(error)
    }

}
module.exports={getQuotes, createQuote, deleteQuote};