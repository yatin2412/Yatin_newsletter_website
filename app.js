const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req,res){
    var first_name = req.body.fname;
    var last_name = req.body.lname;
    var email = req.body.email;
    var data = {
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME:first_name,
                    LNAME:last_name
                }

            }
        ]
    };
    const jsondata = JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/a17f1dc3c2";
    const options = {
        method:"POST",
        auth:"Yatin1:6f1c7e5c556165a8d8f9c06397cbcac5-us10"
    };
    const request = https.request(url,options,function(response){
        if (response.statusCode===200){
            
            res.sendFile(__dirname+"/success.html");
        }else{
            
            res.sendFile(__dirname+"/failure.html");
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
        });
    });
    request.write(jsondata);
    request.end();

});

app.post("/failure",function(req,res){
    res.redirect("/");
});

app.listen(process.env.PORT || 3000,function(req,res){
    console.log("Server is running on port 3000");
});


// api key
// 6f1c7e5c556165a8d8f9c06397cbcac5-us10

// list key:
// a17f1dc3c2