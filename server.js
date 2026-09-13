const express=require("express")
const mongoose=require("mongoose")
const app=express()
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/csec_students")

.then(()=>{
    console.log("mongodb is connected successfully")
})

.catch((e)=>{
    console.log(`error is ${e}`)
})

const studentSchema=mongoose.Schema({
    name:"String",
    age:"Number",
    city:"String"
})

const student=mongoose.model("students",studentSchema)

app.post("/cre_stds",async(req,res)=>{
    const s=await student.insertOne(req.body)
    await res.send(s)
})

app.post("/cre_std",async(req,res)=>{
    const s=await student.insertMany(req.body)
    await res.send(s)
})

app.get("/stds",async(req,res)=>{
    const s= await student.find()
    await res.send(s)
})

app.get("/stds",async(req,res)=>{
    const s= await student.find({city:req.body.city})
    await res.send(s)
})

const port=3333
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})