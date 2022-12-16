//  IMPORT ///////
const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https")
const { response } = require("express")



//  SETUP ///////
app = express()
app.use(express.static("public")) //Express Formula static folder for all the static files
app.use(bodyParser.urlencoded({extended: true})) //Log input and Post in express.js
port = 3000 //setup port
apiKey = "aef7b1c7242b2bb423581fa4dda21ed9-us11"
listId = "ba11850652"


//  GET ///////
app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html")
}) //sending the HTML



//  POST ///////
app.post("/", function(req, res){
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.email
    const data ={
      members: [{
        email_address: email,
        status: "subscribed",
        merge_fields:{
          FNAME: firstName,
          LNAME: lastName
        }

      }]
    }
    const addDataJson = JSON.stringify(data)
    const options = {
      url: "https://us11.api.mailchimp.com/3.0/lists/ba11850652",
      method: "POST",
      headers: {
        Authorization: "auth aef7b1c7242b2bb423581fa4dda21ed9-us11"
      },
      body: addDataJson
      
    }
    request (options, (error, response, body) => {
      body = JSON.parse(body)
      if(response.statusCode == 200){
        res.sendFile(__dirname + "/success.html")
        console.log(JSON.parse(addDataJson))
      }
      else{
        res.sendFile(__dirname + "/failure.html")
        }
    })
  })

app.post("/failure", function(req, res){
  res.redirect("/")
})

app.post("/success", function(req, res){
  res.redirect("/")
})


//  LISTEN ///////
app.listen(process.env.port || port, function(req, res){
    console.log("server is running on " + process.env.port)
})


