//const { Client, RichEmbed } = require('discord.js');
const  Commando  = require('discord.js-commando');
const path = require('path');
const scirra = require('./construct.js');
var firebase = require('firebase');
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
  // capx pinleme
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
  // güncelleme kontrol
  if (message.channel.type == "dm")
  {
    if (message.author.id == "478933409276624896")
    {
      if (message.content.startsWith("!check"))
      {
        scirra.check_c2(client);
        scirra.check_c3(client);
      }
      if (message.content.startsWith("!kapat"))
      {
        process.exit(0);
      }

      // key testi
      if (message.content === "!fb")
      {
        var sunucu = client.guilds.get("598446314165895168");
        sunucu.fetchMembers()
        .then(a=>a.members.map(function(x){
          firebase.database().ref("discord_userlist").once("value")
          .then(
            function(a){
              if (a.child(x.user.id).val() == null)
              {
                firebase.database().ref("discord_userlist/"+x.user.id).set({"isim":x.user.username,"key":"0"});
              }
              else
              {
                firebase.database().ref("discord_userlist/"+x.user.id).once("value").then(function(a){
                  a.ref.child("durum").set("aktif");
                  a.ref.child("tag").set(x.user.tag);
                })
              }
            }
          )
        }))
      }
    }
  }
  // selam cevapları
  if (message.content.startsWith("selam") || message.content.startsWith("Selam") || message.content.startsWith("Merhaba bot") || message.content.startsWith("merhaba bot"))
  {
    message.channel.send("Merhaba "+message.author.username);
  }
  if (message.content.startsWith("naber") || message.content.startsWith("Naber"))
  {
    message.channel.send("İyi, sen nasılsın "+message.author.username+" ?");
  }

});
client.on('guildMemberAdd', member => {
   member.guild.channels.get('598446314631725057').send("Construct Türkiye kanalına hoş geldin <@"+ member.user.id +">. Kullanabileceğin komut listesini görmek için !yardım yazabilirsin. :writing_hand: ").then(m =>m.react("👍"));
   firebase.database().ref("discord_userlist").once("value")
  .then(
    function(a){
      if (a.child(member.user.id).val() == null)
      {
        firebase.database().ref("discord_userlist/"+member.user.id).set({"isim":member.user.username,"key":"0","tag":member.user.tag,"durum":"aktif"});
      }
    }
  )
});
client.on('guildMemberRemove', member => {
  member.guild.channels.get('598446314631725057').send("Hoşçakal "+ member.user.tag).then(m =>m.react("😔"));
  firebase.database().ref("discord_userlist/"+message.user.id).once("value").then(function(a){
    a.ref.child("durum").set("ayrildi");
  })
  //member.guild.channels.get('598446314631725057').send("Hoşçakal <@"+ member.user.id +">").then(m =>m.react("😔"));
});
client.login(process.env.discord_key);