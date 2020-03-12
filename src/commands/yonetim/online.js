const { Command } = require('discord.js-commando');
class online extends Command
{
    constructor(client)
    {
        super(client,{
            name: 'online',
            group: 'yonetim',
            memberName: 'online',
            description: 'bot online durmunu değiştir ',
            examples: ['online'],
            args: [
                {
                  key: 'online',
                  prompt: 'Online durumu seçin? \n online \n idle \n invisible \n dnd',
                  type: 'string',
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
    run(msg,online) {
      let arg = JSON.stringify(online);
      let j = JSON.parse(arg);
      if (msg.channel.type == "dm")
      {
        if ((msg.author.id == "174242106766786570") || (msg.author.id == "478933409276624896") || (msg.author.id == "579257592430460929") || (msg.author.id == "350009686117974037")|| (msg.author.id == "531086739876478976") || (msg.author.id == "196754325794455552"))
        {
            this.client.user.setStatus(j.online)
        } 
      }
    }   
}


module.exports = online;