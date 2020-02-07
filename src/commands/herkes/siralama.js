const { Command } = require('discord.js-commando');
const  {RichEmbed} = require('discord.js');
var _ = require('lodash');
var firebase = require('firebase');
class sıra extends Command
{
	constructor(client)
	{
		super(client,{
            name: 'sıra',
            group: 'herkes',
            memberName: 'sıra',
            description: 'kalp sıralamasındaki yerini görürsün',
            examples: ['sıra'],
		})
	}
    
    /*hasPermission(msg) {
        //if(!msg.guild) return this.client.isOwner(msg.author);
        if(msg.channel.id == "609017383029309443")
            return true;
        //return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
    }*/

    run(msg) {
        var lider_list = new Array;
        try{
            firebase.database().ref("discord_userlist").once("value", snap => {
                var aa= snap.val();
                var si = 0;
                var aaa = _.orderBy(aa, ['durum', 'kalp'], ['asc', 'desc']);
                for (var i = 0; i < 10; i++) {
                    si += 1;
                    lider_list.push(si+"- "+aaa[i].isim + " : "+aaa[i].kalp);
                };
                var embed = new RichEmbed()
                .setTitle('💕 Listesi')
                .setColor(0xFF0000)
                .setDescription(lider_list)
                msg.channel.send(embed);
            });
        }catch(e){
            console.log(e);
        };
        
        //return msg.say('Hi, I\'m awake!');
    }
}


module.exports = sıra;