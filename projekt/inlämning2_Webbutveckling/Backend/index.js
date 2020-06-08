const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const port = 3001
const fs =require('fs')
const path= require('path')
const cors=require('cors')
const bcrypt = require('bcrypt');
app.use(cors())
app.use(express.json())
app.use(bodyparser.json())
app.use(express.urlencoded({
    extended: false
  }));
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static('public'))

app.get('/', function(req, res) {
res.sendFile(path.join(__dirname+'/user_index.html'));
}) 

app.get('/adminLogin', function(req, res){
    var html='';
    html+="<body>"
    html+="<form action='/Admin'method='post' name='adminLoginForm'>";
    html+="Användarnamn: <input type='text' name='username'><br/>";
    html+="Lösenord: <input type='password' name='password'<br/>";
    html+="<input type='submit' value='submit'><br/>";
    html+="</form>";
    html+="</body>";
    res.send(html); 
})
 app.post('/Admin', function(req,res){

       if( req.body.username=== 'test' & req.body.password==='1234'){
         fs.readFile('users.json',(err, data)=>{
             if(err) throw err;
             
             //let users =JSON.parse(data);
             //return res.JSON(users);
             res.send('access granted');
            })
        }
        else{
            res.send('access denied!')
        }
    })

app.post('/reg', (req,res)=>{



    console.log(req.body.user)
    console.log(req.body.username)
    console.log(req.body.password)
    console.log(req.body.subbed)
    res.send(req.body.username+ ' '+req.body.password +' '+req.body.subbed)
    
    fs.readFile('users.json', (err, data)=>{
        if (err) throw err
        const users = JSON.parse(data);
        console.log(users)
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
                
                let user ={
                    username :req.body.username,
                    password : salt,
                    subbed:req.body.subbed
                }
                
                
                var arr = [];
                arr.push(user);
                fs.writeFile('users.json', JSON.stringify(user), err=> {
                    if (err) throw err
                });
                
            })
        })
        //res.send('Done!')
    })
})
/*
       */
    //res.send("success")

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))