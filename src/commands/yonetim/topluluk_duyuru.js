const { Command } = require('discord.js-commando');
const  {RichEmbed} = require('discord.js');
class topluluk extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'topluluk',
            group: 'yonetim',
            memberName: 'topluluk',
            description: 'topluluk duyuru ',
            examples: ['topluluk'],
            args: [
                {
                  key: 'topluluk',
                  prompt: 'içerik girin',
                  type: 'string',
                }
            ],
            userPermissions: ['MANAGE_MESSAGES'],
        })
    }
    
    /*hasPermission(msg) {
        //if(!msg.guild) return this.client.isOwner(msg.author);
        //if ((msg.channel.type !== "dm")) return false;
        //return msg.member.hasPermission('Admin') || this.client.isOwner(msg.author) || (msg.member.id == "174242106766786570");
    }*/
  
    run(msg,topluluk) {
      let arg = JSON.stringify(topluluk);
      let j = JSON.parse(arg);
      var Attachment = (msg.attachments).array();
      try{
        var t_g = Attachment[0].url;
      }
      catch
      {}
      if (msg.channel.type == "dm")
      {
        if ((msg.author.id == "174242106766786570") || (msg.author.id == "478933409276624896") || (msg.author.id == "579257592430460929") || (msg.author.id == "350009686117974037"))
        {
          if (t_g)
          {
            var embed = new RichEmbed()
            .setTitle("Duyuru")
            .setThumbnail('https://raw.githubusercontent.com/erenertugrul/construct-discord-bot/master/src/icon/duyuru.png')
            .setImage(t_g)
            .setColor("RANDOM")
            .setDescription(j.topluluk)
            this.client.channels.get("599557187819405312").send("@here",embed);
          }
          else
          {
            var embed = new RichEmbed()
            .setTitle("Duyuru")
            .setThumbnail('https://raw.githubusercontent.com/erenertugrul/construct-discord-bot/master/src/icon/duyuru.png')
            .setColor("RANDOM")
            .setDescription(j.topluluk)
            this.client.channels.get("599557187819405312").send("@here",embed);
          }

        }
      }
    }
}


module.exports = topluluk;

//            msg.channel.send("@here",embed).then(m =>m.react(":video_game:"));