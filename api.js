const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const compiler = require("compilex")
const options = {stats:true}

compiler.init(options)

app.use(bodyParser.json())
app.use("/codemirror-5.65.15",express.static("E:/VS Code Files/Code Editor/codemirror-5.65.15"))

app.get("/",function(req,res){
   res.sendFile("E:/VS Code Files/Code Editor/index.html")
})

app.post("/compile",function(req,res){

    var code = req.body.code
    var input = req.body.input
    var lang = req.body.lang

    var envData = { OS : "windows"};   
   
    try{
        if(lang== "C++"){
            if(!input){
    
                var envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; 
                compiler.compileCPP(envData , code , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"Error"})
                    }            
                })
            }
            else{
                envData = { OS : "windows" , cmd : "g++", options:{timeout:10000}}; 
                compiler.compileCPPWithInput(envData , code , input , function (data) {
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"Error"})
                    }
            
                })
            }
        }
        else if(lang=="Python"){
            if(!input){
                var envData = { OS : "windows"}; 
                compiler.compilePython( envData , code , function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"Error"})
                    }            
                })   
            }
            else{ 
                var envData = { OS : "windows"}; 
                compiler.compilePythonWithInput( envData , code , input ,  function(data){
                    if(data.output){
                        res.send(data);
                    }
                    else{
                        res.send({output:"Error"})
                    }                   
                })
            }
        }
    }
    catch(e){
        console.log("error")
    }
    
})

app.listen(9000)