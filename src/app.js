//const { Client, RichEmbed } = require('discord.js');
const  Commando  = require('discord.js-commando');
const path = require('path');
const scirra = require('./construct.js');
require('dotenv').config();
require('./fb.js');


const client = new Commando.Client(
{
  commandPrefix: '!',
    owner: '478933409276624896',
    disableEveryone: false,
    unknownCommandResponse: false,
});

client.registry.registerDefaultGroups().registerDefaultTypes().registerDefaultCommands({ help:false, prefix:false, ping:false, eval_:false, commandState:false }).registerGroups([['herkes', 'construct komutları'],['araclar', 'yardımcı araçlar'],['yonetim','yönetici komutları']]).registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready",() => {
  console.log("hazir");
  setInterval(() => scirra.check_c2(client), 600000);
  setInterval(() => scirra.check_c3(client), 600000);
  scirra.check_c2(client);
  scirra.check_c3(client);
});

client.on("message",(message) => {
  if (message.type == "PINS_ADD")
  {
    message.delete();
  }
  if (message.channel.id == "599560254623318017")
  {
    message.attachments.forEach(attachment => {
      const url = attachment.filename;
      if (url.includes("capx") || url.includes("c3p"))
      {
        message.pin();
      }
    });
  }
  if (message.content.startsWith("selam") || message.content.startsWith("Selam") || message.content.startsWith("Merhaba bot") || message.content.startsWith("merhaba bot"))
  {
    message.channel.send("Merhaba "+message.author.username);
  }
  if (message.content.startsWith("naber") || message.content.startsWith("Naber"))
  {
    message.channel.send("İyi, sen nasılsın "+message.author.username+" ?");
  }
  /*if (message.channel.type == "dm")
  {
    
  }*/
});
client.on('guildMemberAdd', member => {
   member.guild.channels.get('598446314631725057').send("Construct Türkiye kanalına hoş geldin <@"+ member.user.id +">. Kullanabileceğin komut listesini görmek için !yardim yazabilirsin. :) ").then(m =>m.react("👍"));
});
client.on('guildMemberRemove', member => {
  member.guild.channels.get('598446314631725057').send("Hoşçakal "+ member.user.tag).then(m =>m.react("😔"));
  //member.guild.channels.get('598446314631725057').send("Hoşçakal <@"+ member.user.id +">").then(m =>m.react("😔"));
});
client.login(process.env.discord_key);