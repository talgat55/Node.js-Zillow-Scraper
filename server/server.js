import http from "http"
import express from "express"
import bodyParser from "body-parser"
import templating from "consolidate"
import request from "request"
import urlutils from "url"



const  app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());


app.engine("hbs", templating.handlebars );

app.set("view engine", "hbs");
app.set("views", __dirname + "/../client/views");
// routes
app.get( "/",  (req, res) =>  {

  res.render("index", {
    title : " INDEX PAGE"

  });

});

app.post("/", (req, res) => {


  if(!req.body.test || req.body.test==""){

    res.render("index", {
        title: "SOME: "+ req.body.text ,

    }); 
  }else {
      res.render("index", {
          title: "GOOD"

      });
  }

});


app.listen(3000);

console.log("server run port 3000")
