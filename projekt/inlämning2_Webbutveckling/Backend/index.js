const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const port = 3000
const fs =require('fs')
const path= require('path')
app.use(bodyparser.json())

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname+'/user_index.html'));
}) 

app.post('/Login', (req,res)=>{
if( req.body.username=== 'test' & req.body.pw==='1234'){
    fs.readFile('users.json',(err, data)=>{
        if(err) throw err;
        let users =JSON.parse(data);
        //return res.JSON(users);
        console.log(users);
    })
}})

app.post('/reg', (req,res)=>{
    fs.writeFile('users.json', (err,data)=> {
        if(err) throw err;
        let users =req.body.username & req.body.pw & req.body.subbed})
    })
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))