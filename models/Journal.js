const mongoose = require("mongoose");
const Article = require("./Article");
const Schema = mongoose.Schema;

// journal schema
const journalSchema = new Schema({
    name:{
      type: String,
      required : true
    },
   
    user:[{ type:Schema.Types.ObjectId, ref :"User"}],
    // each journal can have multiple articles so saving as an array 
    articles:[{type:Schema.Types.ObjectId, ref :"Article"}]
  });


  // Look into Mongoose Pre/Post hooks (remove, save, virtuals)
  //  journalSchema.pre('remove', (next) => {
  //    Article.remove({
  //      "_id": {
  //        $in: this.Article
  //      }
  //    })
  // });



  const Journal = mongoose.model("Journal", journalSchema);
  module.exports = Journal;