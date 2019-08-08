const { Client, RichEmbed } = require('discord.js');
const  Commando  = require('discord.js-commando');
const path = require('path');
const client = new Commando.Client({
    commandPrefix: '!',
    owner: '478933409276624896',
    disableEveryone: false,
});

client.registry
	.registerGroups([
	['herkes', 'herkes kullanabilir']
	])
	.registerDefaults()
	.registerCommandsIn(path.join(__dirname, 'commands'));
require('dotenv').config();
//const client = new Client();
const request = require('request');
const cheerio = require('cheerio');
const scirra = require('./construct.js');
require('./fb.js');
function uye_listesi(a) 
{
	//http://zetcode.com/javascript/cheerio/
	var online_list = new Array;
	request("https://www.construct.net/en/forum",function (error,response,body) {
  		const $ = cheerio.load(body);
	    $('.activeUsers li > div > div:nth-child(2) > div > a>span:nth-child(1)').each(function (i, e) {
	        online_list[i] = $(this).text();
	    });
	    const embed = new RichEmbed()
		.setTitle('Şu an forumda olanlar')
		.setColor(0xFF0000)
		.setDescription(online_list)
		.addField('forum:', 'https://www.construct.net/en/forum')
		a.channel.send(embed);
	})
}

 
client.on("ready", () => {
	console.log("hazir");
  setInterval(() => scirra.check_c2(client), 5000);
  setInterval(() => scirra.check_c3(client), 5000);
});
 
client.on("message", (message) => {
	//console.log();
  	/*if (message.content.startsWith("!forum")) {
	    uye_listesi(message);
  	}*/
  	if (message.content.startsWith("selam")) {
	    message.channel.send("Merhaba "+message.author.username);
  	}

});
 
client.login(process.env.discord_key);
