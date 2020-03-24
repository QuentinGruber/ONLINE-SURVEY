var jwt = require('jsonwebtoken');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;




exports.GetAccessToken = function (req, res) {
    var xhttp = new XMLHttpRequest();
    var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
    xhttp.onreadystatechange = function () { // handle request response
      if (this.readyState === 4 && this.status === 200) {
        console.log("answer : " + this.responseText);
      }
    };
    xhttp.handleError(console.log("error"))
    // Send a post request
    xhttp.open("POST", "https://www.linkedin.com/oauth/v2/accessToken?code=" + decoded.code + "&client_id=78s03bsfw6m7c3&client_secret=KBghXMRTiKoNycwP&grant_type=authorization_code&redirect_uri=http://localhost:3000/linkedin", true);
    xhttp.send();
    console.log("sendpostrequesttolinkedin")
}