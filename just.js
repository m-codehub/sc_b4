const express=require("express")
const mongoose=require("mongoose")
const app=express()
app.use(express.json())
mongoose.connect("mongodb://localhost:27017/csec_students")
.then(()=>{
    console.log("mongodb is connected")
})
.catch((e)=>{
    console.log(`error is ${e}`)
})
const studentSchema=mongoose.Schema({
    name:"String",
    age:"Number",
    gender:"String",
    course:"String",
    year:"String",
    marks:"Number",
    city:"String",
    email:"String"
})
const student=mongoose.model("students",studentSchema)

app.post("/create_student",async(req,res)=>{
    const s= await student.insertOne(req.body)
    await res.send(s)
})
app.post("/create_students",async(req,res)=>{
    const s=await student.insertMany(req.body)
    await res.send(s)
})

app.get("/students",async(req,res)=>{
    const s=await student.find()
    await res.send(s)
    await console.log(s)
})

app.get("/student",async(req,res)=>{
    const s=await student.find({city:req.body.city})
    await res.send(s)
    await console.log(s)
})

const port=5555
app.listen(port,()=>{
console.log(`server is running at http://localhost:${port}`)
})