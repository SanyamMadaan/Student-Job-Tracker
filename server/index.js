const express=require('express');
require('dotenv').config();
const PORT=process.env.PORT || 3000;
const cors=require('cors');
const UserRoutes =require('./Routes/UserRoutes');
const JobRoutes=require('./Routes/JobRoutes');

const app=express();

app.use(cors());

app.use('/api/v1/user',UserRoutes);
app.use('api/v1/job',JobRoutes);

app.listen(PORT,()=>{
    console.log(`App is running on http://localhost:${PORT}`);
})