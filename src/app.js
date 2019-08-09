const { Client, RichEmbed } = require('discord.js');
const  Commando  = require('discord.js-commando');
const path = require('path');
const scirra = require('./construct.js');
require('dotenv').config();
require('./fb.js');


const client = new Commando.Client({
    commandPrefix: '!',
    owner: '478933409276624896',
    disableEveryone: false,
});

client.registry.registerGroups([['herkes', 'herkes kullanabilir']]).registerDefaults().registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready", () => {
	console.log("hazir");
 // setInterval(() => scirra.check_c2(client), 5000);
 // setInterval(() => scirra.check_c3(client), 5000);
});
 
client.on("message", (message) => {
  	/*if (message.content.startsWith("!forum")) {
	    uye_listesi(message);
  	}*/
  	if (message.content.startsWith("selam")) {
	    message.channel.send("Merhaba "+message.author.username);
  	}

});
 
client.login(process.env.discord_key);
