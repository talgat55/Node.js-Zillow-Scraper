import http from "http"
import express from "express"
import bodyParser from "body-parser"
import templating from "consolidate"
import request from "request"
import urlutils from "url"
import config from "./../config/config.json"
import parser from 'xml2json';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


app.engine("hbs", templating.handlebars);

app.set("view engine", "hbs");
app.set("views", __dirname + "/../client/views");
// routes
app.get("/", (req, res) => {

    res.render("index", {
        title: "Please entry state and city"

    });

});

app.post("/", (req, res) => {


    if (!req.body.test || req.body.test == "") {

        res.render("index", {
            title: "SOME: " + req.body.text,

        });
    } else {
        let reqinput = req.body.test;
        let arr = reqinput.split(",")

        request('http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=' + config.API + '&state=' + arr[0] + '&city=' + arr[1] + '&childtype=neighborhood', function(error, response, body) {
            if (!error && response.statusCode == 200) {
                let jsonarray = parser.toJson(body);
                let object = JSON.parse(jsonarray);
                console.log(object["RegionChildren:regionchildren"].response.list.region)
                res.render("index", {
                    title: "GOOD",
                    data: object["RegionChildren:regionchildren"].response.list.region
                });

            }
        })

    }

});


app.listen(3000);

console.log("server run port 3000")