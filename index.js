const express=require('express')
const colors=require('colors')
const dotenv=require('dotenv')
const connectDB=require('./config/db.js')

const productRoutes = require('./routes/productRoutes.js')



const cors=require('cors')
dotenv.config()
connectDB()
const app=express()
app.use(cors())
app.use(express.json())

app.use('/api/products',productRoutes)


app.get("/",(req,res)=>{
    res.send("<h1>Welcome</h1>")
})

const PORT=process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`.bgMagenta)
})