var jwt = require('jsonwebtoken');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const Axios = require('axios');



async function RetrieveUserInfo(access_token, req, res) {
    
    // get basic info
    try {
        var profileInfo_promise = await Axios({
            method: 'get',
            url: "https://api.linkedin.com/v2/me",
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
    }
    catch (e) {
        console.log(e)
    }
    // get email info
    try {
        var email_promise = await Axios({
            method: 'get',
            url: "https://api.linkedin.com/v2/clientAwareMemberHandles?q=members&projection=(elements*(primary,type,handle~))",
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        })
    }
    catch (e) {
        console.log(e)
    }
    

    let User_email = email_promise.data.elements[0]['handle~'].emailAddress
    let User_LastName = profileInfo_promise.data.localizedLastName
    let User_FirstName = profileInfo_promise.data.localizedFirstName
    var user_data = {givenName:User_FirstName,familyName:User_LastName,email:User_email}
    res.send(user_data)
}



exports.LoginWithLinkedin = async function (req, res) {

    var decoded = jwt.verify(req.query.jwt_token, MariaDB_config.PUB_key);
    try {
        var access_token_promise = await Axios({
            method: 'post',
            url: "https://www.linkedin.com/oauth/v2/accessToken?code=" + decoded.code + "&client_id=78s03bsfw6m7c3&client_secret=KBghXMRTiKoNycwP&grant_type=authorization_code&redirect_uri=http://localhost:3000/linkedin",
            headers: {}
        })
    }
    catch (e) {
        console.log(e)
    }
    //console.log(access_token_promise)
    RetrieveUserInfo(access_token_promise.data.access_token, req, res)
}