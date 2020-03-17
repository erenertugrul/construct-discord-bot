const { Command } = require('discord.js-commando');
const firebase = require('firebase');
const { registerFont,createCanvas, loadImage } = require('canvas');
registerFont('src/font/futura-pt-medium.otf', { family: 'futura-pt-medium' });
var _ = require('lodash');
module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'kalp',
			group: 'herkes',
			memberName: 'kalp',
			description: 'kaç kişi sana kalp attı'
		});
	}

	async run(msg) {
		const canvas = createCanvas(465, 145);
		const ctx = canvas.getContext('2d');
		var roundRect = function(x, y, w, h, radius)
		{
		  var r = x + w;
		  var b = y + h;
		  ctx.beginPath();
		  ctx.strokeStyle="black";
		  ctx.lineWidth="4";
		  ctx.moveTo(x+radius, y);
		  ctx.lineTo(r-radius, y);
		  ctx.quadraticCurveTo(r, y, r, y+radius);
		  ctx.lineTo(r, y+h-radius);
		  ctx.quadraticCurveTo(r, b, r-radius, b);
		  ctx.lineTo(x+radius, b);
		  ctx.quadraticCurveTo(x, b, x, b-radius);
		  ctx.lineTo(x, y+radius);
		  ctx.quadraticCurveTo(x, y, x+radius, y);
		  ctx.fillStyle = "black";
		  ctx.fill();
		  ctx.stroke();
		}
		try
		{
			firebase.database().ref("discord_userlist").once("value", snap => {
	    	try
	    	{
	      	var aa = snap.val();
      		if (aa[msg.author.id] !== null)
	      	{
	          	var a = _.orderBy(aa, ['durum', 'kalp'], ['asc', 'desc']);
	          	var b =_.findKey(a, ['isim', msg.author.username]);
	          	var k = a[b].kalp;

	          	if (msg.author.avatarURL !== null)
	          	{
		          	loadImage(msg.author.avatarURL).then((image) => {
		          		roundRect(10, 10, 450, 120, 20);
		              	ctx.save();
		              	ctx.beginPath();
		              	ctx.arc(75, 70, 50, 0, Math.PI * 2, true);
			            ctx.closePath();
			            ctx.clip();
						ctx.stroke();
						ctx.drawImage(image, 25,20, 100, 100);
						ctx.restore();
						ctx.fillStyle = "white";
						ctx.font = '30px futura-pt-medium';
						ctx.fillText(msg.author.username, 150, 55);
		              	loadImage("./src/gorsel/kalp.png").then(image =>{
		                	ctx.fillStyle = "#dc2053";
			                ctx.font = '30px futura-pt-medium'
			                ctx.fillText(k, 180, 100);
			                ctx.drawImage(image, 150, 77, 26, 24);
			                ctx.font = "50px futura-pt-medium";
			                ctx.fillStyle = "white";
			                ctx.fillText((parseInt(b)+1)+"#", 380, 90);
			                msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'kalp.png' }] });
		              	});
		      		});
	          	}
	          	else
	          	{
		          	loadImage("./src/gorsel/no_avatar.png").then((image) => {
		          		roundRect(10, 10, 450, 120, 20);
		              	ctx.save();
		              	ctx.beginPath();
		              	ctx.arc(75, 70, 50, 0, Math.PI * 2, true);
			            ctx.closePath();
			            ctx.clip();
						ctx.stroke();
						ctx.drawImage(image, 25,20, 100, 100);
						ctx.restore();
						ctx.fillStyle = "white";
						ctx.font = '30px futura-pt-medium';
						ctx.fillText(msg.author.username, 150, 55);
		              	loadImage("./src/gorsel/kalp.png").then(image =>{
		                	ctx.fillStyle = "#dc2053";
			                ctx.font = '30px futura-pt-medium'
			                ctx.fillText(k, 180, 100);
			                ctx.drawImage(image, 150, 77, 26, 24);
			                ctx.font = "50px futura-pt-medium";
			                ctx.fillStyle = "white";
			                ctx.fillText((parseInt(b)+1)+"#", 380, 90);
			                msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'kalp.png' }] });
		              	});
			      	});
	        	};
	      	};
		    }
		    catch(e)
		    {
		      console.log(e);
		    }
		  });
		}
		catch(e)
		{
		  console.log(e);
		}
	};
};
