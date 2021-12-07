

const mongoose = require("mongoose")

const contestSchema = new mongoose.Schema({
    title : {type :String , required : true},
    category : {type : String , required : true},
    deadline : {type:String , required : true},
    tag : {type : String , required : true}
},{
    versionKey : false,
    timestamps : true
})

const Contest = mongoose.model("contest",contestSchema);

module.exports = Contest