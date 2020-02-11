const { Command } = require('discord.js-commando');
class sil extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'sil',
            group: 'yonetim',
            memberName: 'sil',
            description: 'bot sil durmunu değiştir ',
            examples: ['sil'],
            args: [
                {
                  key: 'sil',
                  prompt: 'silinecek mesaj sayısını yazın',
                  type: 'integer',
                }
            ]
        })
    }
    /*
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        if ((msg.channel.type !== "dm")) return false;
        return msg.member.hasPermission('Admin') || this.client.isOwner(msg.author) || (msg.member.id == "174242106766786570");
    }
  */
    run(msg,sayi) {
        if ((msg.author.id == "174242106766786570") || (msg.author.id == "478933409276624896") || (msg.author.id == "579257592430460929") || (msg.author.id == "350009686117974037")|| (msg.author.id == "196754325794455552"))
        {
           if (msg.channel.type == 'text') {
            msg.channel.fetchMessages({limit: 3})
           .then(function(list){
            //var a = list.filter(m => m.author.username == "eren")
            msg.channel.bulkDelete(list);
                
            }, function(err){msg.channel.send(e)});
            }
        }
    }
}


module.exports = sil;