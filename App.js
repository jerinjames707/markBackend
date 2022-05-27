const Express=require("express")
const Bodyparser=require("body-parser")
const Mongoose=require("mongoose")


var app=Express()

app.use(Bodyparser.urlencoded({extended:true}))
app.use(Bodyparser.json())
app.use((req, res, next) => { 
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" ); 
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS" ); 
    next(); });


var markModel=Mongoose.model("marks",new Mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        adno:{
            type:String,
            required:true
        },
        cgpa:{
            type:String,
            required:true
        }
    }
))

Mongoose.connect("mongodb+srv://mzc:mzc@cluster0.hssmr.mongodb.net/mark")


app.post("/api/delete",(req,res)=>{
    var getId=req.body
    markModel.findByIdAndRemove(getId,(error,data)=>{
        if(error)
        {
            res.send({"status":"error"})

        }
        else
        {
            res.send({"status":"succcess"})

        }
        })
    })






app.post("/api/search",(req,res)=>{
var getadno=req.body
markModel.find(getadno,(error,data)=>{
    if(error)
    {
        res.send({"status":"error"})}
    else
    {
        res.send(data)
    }

})
})





app.get("/api/viewall",(req,res)=>{
markModel.find(
    (error,data)=>{
    if(error)
    {
        res.send({"status":"error"})
    }
        else{
            res.send(data)
        }
    })
})

app.post("/api/read",(req,res)=>{
    var data=req.body
    
    let ob=new markModel(data)
    ob.save(
        (error,data)=>
        {
         if(error)
         {
             res.send({"status":"error"})

         }
         else{
             res.send({"status":"success","data":data})

         }

        }
        )
})


    app.listen(4000,()=>{
        console.log("server is running")
    })