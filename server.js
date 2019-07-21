const express = require('express');
const request = require('request');
const querystring = require('querystring')

const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`listening on port ${port}`))

app.get('/express_backend', (req, res) => {
    res.send({express: 'EXPRESS BACKEND CONNECTED'})
});

let redirect_uri = process.env.REDIRECT_URI || 'http://localhost:5000/callback'

app.get('/login', function (req, res) {
    res.redirect('https://api.ciscospark.com/v1/authorize?' + querystring.stringify({response_type: 'code', client_id: 'C3d286c6dcc8316a5d0064c8bc5af7676a5a88d0e3a778c414ace40b72c7c599c', redirect_uri: redirect_uri, scope: 'spark:all', state: "mystate"}))
})

app.get('/callback', function (req, res) {
    let code = req.query.code || null
    let authOptions = {
        url: 'https://api.ciscospark.com/v1/access_token',
        form: {
            grant_type: 'authorization_code',
            client_id: 'C3d286c6dcc8316a5d0064c8bc5af7676a5a88d0e3a778c414ace40b72c7c599c',
            client_secret: 'dc660f8933b90fb0eea34b43524965ac562d89d256197b9cafd4c57aa27cb98a',
            code: code,
            redirect_uri,
        },
        json: true
    }
    request.post(authOptions, function (error, response, body) {
        var access_token = body.access_token
        let uri = process.env.FRONTEND_URI || 'http://localhost:3000'
        res.redirect(uri + '?access_token=' + access_token)
    })
})
