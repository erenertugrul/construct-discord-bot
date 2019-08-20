const  {RichEmbed} = require('discord.js');
const request = require('request');
var firebase = require('firebase');
const cheerio = require('cheerio');

class Construct
{
	constructor()
	{

	}
	static get c2()
	{
		return "https://www.scirra.com/construct2/version.txt";
	}
	static get c3()
	{
		//https://www.construct.net/sitemap_productrelease_1.xml
		return "https://editor.construct.net/versions.json"
	}
	static komut_c2(message)
	{
		var database = firebase.database();
		
		database.ref("c2_version").once("value").then(async (v) =>{
			var embed = new RichEmbed()
			.setTitle("C2 Sürümü")
			.setColor(0xFF0000)
			.setDescription("Construct 2 sürümü "+v.val()+ "'dir.")
			.addField("site","https://www.scirra.com/construct2/releases/"+v.val())
			message.channel.send(embed);
		})

	}
	static komut_c3(message)
	{
		var database = firebase.database();
		
		database.ref("c3_version").once("value").then(async (v) =>{
			var embed = new RichEmbed()
			.setTitle("C3 Sürümü")
			.setColor(0xFF0000)
			.setDescription("Construct 3 sürümü "+v.val()+ "'dir.")
			.addField("site","https://editor.construct.net/"+v.val())
			message.channel.send(embed);
		})

	}
	static check_c3(message)
	{
		var database = firebase.database();
		request(this.c3,function(error,response,body){
			var c3 = JSON.parse(body);
			database.ref("c3_version").once("value").then(async (v) =>{
				var fv = v.val();
				if (c3[0].releaseName > fv)
				{
					database.ref("c3_version").set(c3[0].releaseName);
					var embed = new RichEmbed()
					.setTitle("Yeni C3 sürümü çıktı!")
					.setColor(0xFF0000)
					.setDescription("Yeni sürüm "+c3[0].releaseName+" çıktı")
					.addField("Site","https://www.construct.net/en/make-games/releases/"+c3[0].releaseName)
					message.channels.get("599557090029338626").send("@here",embed).then(m =>m.react("👍"));
				}
			})
		})
	}
	static check_c2(message)
	{
		var database = firebase.database();
		request("https://www.scirra.com/construct2/version.txt",function(error,response,body){
			var v = body.split("\n");
			//console.log(v);
			database.ref('c2_version').once('value').then(async (snapshot) => {
	      		const title = snapshot.val();
				for(var i=0; i < v.length; i++)
				{
					if (v[i].substr(49) > title)
					{	var x = v[i].substr(49);

						database.ref('c2_version').set(x);
						const embed = new RichEmbed()
						.setTitle("Yeni C2 sürümü çıktı!")
						.setColor(0xFF0000)
						.setDescription("Yeni sürüm "+x+" çıktı")
						.addField("indirmek için","https://www.scirra.com/construct2/releases/"+x)
						message.channels.get("599557090029338626").send("@here",embed).then(m =>m.react("👍"));
						//message.channel.send(embed); 609017383029309443
					}
				}
			});
      	});
	}
	static komut_forum(message)
	{
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
			message.channel.send(embed);
		})
	}
}

module.exports = Construct;