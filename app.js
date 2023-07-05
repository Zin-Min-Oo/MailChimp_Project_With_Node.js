const express = require("express");
const bodyParsesr = require("body-parser");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParsesr.urlencoded({extended: true}));

app.get("/",(request,response)=>{
    response.sendFile(__dirname +  "/signup.html");
});

app.post("/",(request,response)=>{
    const firstName = request.body.fName;
    const lastName = request.body.lName;
    const email = request.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };


   var jsonData = JSON.stringify(data);

   const url = "https://us21.api.mailchimp.com/3.0/lists/a60ca6ce30";

   const options = {
    method: "POST",
    auth:  "ZinMInOO21:27bf144a16f4ddfc0c0baf09d0ec9f17-us21"
   }

   const httpsRequest = https.request(url, options, (httpsResponse) => {
    // httpResponse.on("data", (data) => {
    //     console.log(JSON.parse(data));
    // });

    if(httpsResponse.statusCode === 200) {
        response.sendFile(__dirname + "/success.html");
    } else {
        response.sendFile(__dirname + "/failure.html");
    }
});
    httpsRequest.write(jsonData);
    httpsRequest.end();
});

app.post("/failure",(request,response)=>{
    response.redirect("/");
})

app.listen(3000,()=>{console.log("Server is running on 3000")});


/* API Key */
// 27bf144a16f4ddfc0c0baf09d0ec9f17-us21

/* Audience Id */
// a60ca6ce30.