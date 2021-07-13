const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
const imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    
    img:
    {
        data: Buffer,
        contentType: String,
        path : String
    },
    article: [{ type:Schema.Types.ObjectId, ref: "Article" }],
});
 
//Image is a model which has a schema imageSchema
const Image = mongoose.model("Image", imageSchema);
module.exports = Image;

 