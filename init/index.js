const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/WanderLust";
main().then(()=>{
    console.log("connected to DB"); 
})
.catch((err)=>{
    console.log(err); 
});
async function main() {
  await mongoose.connect(MONGO_URL);
}
const initDB= async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
       ... obj,
        owner: "68d120991b0458f62c903d3b",
    }));
    await Listing.insertMany(initData.data);
    console.log("data Was Intiaized");
    
}
initDB();
