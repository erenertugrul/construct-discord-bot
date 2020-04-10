require('dotenv').config();
const request = require('request');
const http = require ("http");
const server = http.createServer((req, res) => {
  let data = []
  req.on('data', chunk => {
      
    data.push(chunk)
  })
  req.on('end', () => {
    res.writeHead(200);
    res.end("\n");
    try{
        var a = JSON.parse(data);
        request({
            uri: 'ISteamLeaderboards/SetLeaderboardScore/v1',
            baseUrl: 'https://partner.steam-api.com/',
            formData: {
                key: process.env.webapi,
                appid: process.env.appid,
                leaderboardid:a.l,
                steamid:a.i,
                score:a.s,
                scoremethod:a.m
            },

        headers: {
           'content-type': 'multipart/form-data'
        },
            method :"POST"
        }, (err, res, body) => {
       
           console.log(res);
            
        });
    }
    catch(e){
        console.log(e);
    }
  })
}).listen(8080);
