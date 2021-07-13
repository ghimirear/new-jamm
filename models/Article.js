const mongoose = require("mongoose");
const Journal = require("./Journal");
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  createAt: {
    type: Date,
    default: () => Date.now()
  },
  image:{
    name: String,
    desc: String,
    data: Buffer,
    contentType: String,

  },
  // each article belong to one user and one Journal 
  image:[{type:Schema.Types.ObjectId, ref:"Image"}],
  user: [{ type: Schema.Types.ObjectId, ref: "User" }],
  journal: [{ type: Schema.Types.ObjectId, ref: "Journal" }]
});
// defining middleware to delete 
articleSchema.post("remove", document => {
  const articleId = document._id;
  Journal.find({ articles: { $in: [articleId] } }).then(journals => {
    Promise.all(
      journals.map(journal =>
        
        Journal.findOneAndUpdate(
         {_id: journal._id,},
          { $pull: { articles: articleId } },
          { new: true }
        )
        
      )
    );
  });
});
const Article = mongoose.model("Article", articleSchema);
module.exports = Article;