var jwt = require('jsonwebtoken');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const fetch = require("node-fetch");
global.Headers = fetch.Headers;



async function RetrieveUserInfo(access_token, req, res) {
    var pd = await fetch("https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))", {
        method: 'GET',
        headers: {'Authorization': 'Bearer '+access_token+''},
    })
    console.log(pd)
}



exports.LoginWithLinkedin = function (req, res) {
    var xhttp = new XMLHttpRequest();
    var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
    xhttp.onreadystatechange = function () { // handle request response
        if (this.readyState === 4 && this.status === 200) {
            console.log("answer : " + this.responseText);
            let access_token = this.responseText.access_token
            RetrieveUserInfo(access_token, req, res)
        }
    };
    // Send a post request to get access token
    xhttp.open("POST", "https://www.linkedin.com/oauth/v2/accessToken?code=" + decoded.code + "&client_id=78s03bsfw6m7c3&client_secret=KBghXMRTiKoNycwP&grant_type=authorization_code&redirect_uri=http://localhost:3000/linkedin", true);
    xhttp.send();
}