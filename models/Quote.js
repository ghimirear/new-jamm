const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// quotesSchema
const quoteSchema = new Schema({
    name:{
      type: String,
    },
    // each quote belongs to single user
    user:[{ type:Schema.Types.ObjectId, ref :"User"}]
  });
  quoteSchema.post("remove", document => {
    const quoteId = document._id;
    User.find({ quotes: { $in: [quoteId] } }).then(quotes => {
      Promise.all(
       quotes.map(quote =>
          User.findOneAndUpdate(
            quote._id,
            { $pull: { quotes: quoteId } },
            { new: true }
          )
        )
      );
    });
  });
  const Quote = mongoose.model("Quote", quoteSchema);
  module.exports = Quote;