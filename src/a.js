const cheerio = require('cheerio')
const request = require('request');
request('https://teachofgame.com/index.php', function (error, response, body) {

		  	const $ = cheerio.load(body);
		  	//const common = $('form#form1 div:nth-child(5) > div:nth-child(1)> div:nth-child(1)').text();
		  	const common = $("tbody#boardstats_e");
		  	const ara = common.find(".smalltext").text();
		  	console.log(ara);
		  	//const ara = common.find('.li > div > div:nth-child(2) > div > a > span').text();
		    /*const newTitle = common.find('.titleOuterWrap > div > div.right > a')
		      .text().trim();
		    const author = common.find('.statWrap > div:nth-child(2) > div > div#Wrapper > ul > li.username > a')
		      .text().trim();
		    const timeToRead = common.find('.statWrap > div:nth-child(1) > div > ul > li:nth-child(2)')
		      .text().replace(/<img(.*)>/, '').replace('read time', '')
		      .trim();
		    const link = common.find('.titleOuterWrap > div > div.right > a')
		      .attr('href').trim()
		      .replace(/^(.*?)\/blogs/, 'https://www.construct.net/blogs');
		    const image = common.find('.statWrap > div:nth-child(2) > div > div#Wrapper > a > div > div > img')
		      .attr('data-src');*/
})




/*

https://www.construct.net/blogs/posts');

    const $ = cheerio.load(body);
    const common = $('form#form1 div:nth-child(3) > div:nth-child(1) > div > div');


    */