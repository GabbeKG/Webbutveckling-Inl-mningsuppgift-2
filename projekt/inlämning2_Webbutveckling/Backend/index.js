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
        fs.readFile('users.json', 'utf8', function(err, data){
            if(err)throw err;
            var obj = JSON.parse(data);
           var userList ='';
           var emailList='';
            for (var i=0; i<obj.users.length;i++){
                if(obj.users[i].subbed == true)
                {
                    emailList+=obj.users[i].email+' '.split(' ')+' ';
                }
               
            
            
                //let users =JSON.parse(data);
                //return res.JSON(users);
            } 
            for (var i=0; i<obj.users.length;i++){
                userList+=JSON.stringify(obj.users[i].username)+'<br/>';
                   
            }  
            res.send("<label>Användare</label><br/>"+userList+'<br/>'+"<label>E-postadresser</label><br/>" +emailList);
             
            
            })
        }
        else{
            res.send('access denied!')
        }
    })

app.post('/reg', (req,res)=>{



    console.log(req.body.user)
    console.log(req.body.username)
    console.log(req.body.email)
    console.log(req.body.password)
    console.log(req.body.subbed)
    res.send(req.body.username+ ' '+req.body.email+' '+req.body.password +' '+req.body.subbed)
    
    fs.readFile('users.json', (err, data)=>{
        if (err) throw err
        const user = JSON.parse(data);
        console.log(user)
        const saltRounds = 10;
        bcrypt.genSalt(saltRounds, (err, salt)=> {
            bcrypt.hash(req.body.password, saltRounds, (err, hash)=> {
                
                
                
                var newuser={
                    username :req.body.username,
                    email :req.body.email,
                    password : salt,
                    subbed:req.body.subbed
                }                
                user.users.push(newuser);
                
                fs.writeFile('users.json', JSON.stringify(user,null, '\n'),  err=> {
                    if (err) throw err
                });
                
            })
        })
        //res.send('Done!')
    })
});
  
app.get('/user',function(req,res){
    fs.readFile('user.json', 'utf8', function(err, data){
        if(err)throw err;
        var obj = JSON.parse(data);
        res.send(obj)
})
})
app.post('/Login', (req, res)=>{
    
    fs.readFile('users.json', 'utf8', function(err, data){
        if(err)throw err;
        var obj = JSON.parse(data);
        
        
        
        for (var i=0; i<obj.users.length;i++){
            if(req.body.username === obj.users[i].username){
                bcrypt.hash(req.body.password, 10, function(err, hash){
                    if(err){throw (err);}
                    
                    bcrypt.compare(req.body.password, hash , function(err, result){
                        if (result=true){
                            loggedUser={username :req.body.username}
                            console.log(loggedUser)
                            console.log('success')
                            fs.writeFile('user.json', JSON.stringify(loggedUser,null, '\n'),  err=> {
                                if (err) throw err
                            });
                            return res.send(result);
                        }
                                if (err){
                                    throw (err);
                                }
                        if(result=false){
                            //console.log('fail')
                            return res.send(result);
                        }
                    })
                })
            }
            if(req.body.username !=obj.users[i].username){
                return;

            }
        }
        
    })
})
app.post('/logout', (req, res)=>{
    LoggedIn=false;
    return('./Login')
})
app.post('/userupdate', (req, res)=>{
    fs.readFile('users.json', 'utf8', function(err, data){
        if(err)throw err;
        var obj = JSON.parse(data);
        for (var i=0; i<obj.users.length;i++){
            if(req.body.username ==obj.users[i].username){
                obj.users[i].subbed = req.body.subbed;
                fs.writeFile('users.json', JSON.stringify(obj,null, '\n'),  err=> {
                    if (err) throw err
                });
                 res.send(obj.users[i].subbed)
    
            }
        }
       
    })
})
/*
       */
    //res.send("success")
    app.get('/userInfo', (req, res)=>{
        fs.readFile('user.json', 'utf8', function(err, data){
            if(err)throw err;
            var username=JSON.parse(data);
            fs.readFile('users.json', 'utf8', function(err, data){
            if(err)throw err;
            var obj = JSON.parse(data);
            
            
            
            for (var i=0; i<obj.users.length;i++){
                if(username.username === obj.users[i].username){
                   console.log(obj.users[i])
                  return res.send(obj.users[i])      
                  
                }
                if(username.username != obj.users[i].username){
                    console.log('fail')
                }    
                
            }
            
        })
    })
    })
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))