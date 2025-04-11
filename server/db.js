const mongoose=require('mongoose');
const DB=process.env.DB_URL;

mongoose.connect(DB,()=>{
    console.log('Connected to MongoDB');
})