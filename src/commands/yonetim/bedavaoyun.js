const { Command } = require('discord.js-commando');
const  {RichEmbed} = require('discord.js');
class bedavaoyun extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'bedavaoyun',
            group: 'yonetim',
            memberName: 'bedavaoyun',
            description: 'bedavaoyun duyuru ',
            examples: ['bedavaoyun'],
            args: [
                {
                  key: 'bedava',
                  prompt: 'oyun linkini girin',
                  type: 'string',
                }
            ],
            userPermissions: ['MANAGE_MESSAGES'],
        })
    }
    /*
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        if ((msg.channel.type !== "dm")) return false;
        return msg.member.hasPermission('Admin') || this.client.isOwner(msg.author) || (msg.member.id == "174242106766786570");
    }
  */
    run(msg,bedava) {
      let arg = JSON.stringify(bedava);
      let j = JSON.parse(arg);
      var Attachment = (msg.attachments).array();
      var t_g = Attachment[0].url;
      if (msg.channel.type == "dm")
      {
        if ((msg.author.id == "174242106766786570") || (msg.author.id == "478933409276624896"))
        {
            var embed = new RichEmbed()
            .setTitle("Bedava Oyun")
            .setImage(t_g)
            .setColor("RANDOM")
            .setDescription(j.bedava)
            .setURL(j.bedava)
            this.client.channels.get("629688253905109002").send(embed).then(m =>m.react("🆓"));
        }
      }
    }
}


module.exports = bedavaoyun;