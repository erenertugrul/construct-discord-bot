//const { Client, RichEmbed } = require('discord.js');
const  Commando  = require('discord.js-commando');
const path = require('path');
const scirra = require('./construct.js');
var firebase = require('firebase');
//const { registerFont,createCanvas, loadImage } = require('canvas');
var { RichEmbed } = require('discord.js');
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
  client.user.setActivity("Construct 3" ,{ type: "PLAYING" });
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
                firebase.database().ref("discord_userlist/"+x.user.id).set({"isim":x.user.username,"key":"0","tag":x.user.tag,"durum":"aktif","kalp":0});
              }
              else
              {
                firebase.database().ref("discord_userlist/"+x.user.id).update({"isim":x.user.username});
              }
            }
          )
        }));
      }
      if (message.content === "!aktif")
      {
        var list = new Array;
        const guild = client.guilds.get('598446314165895168');
        //var aktiflist = guild.members.filter(function(a){if(a.presence.status !== 'offline'){list.push(a.user.username)}});
        guild.members.filter(function(a){if(a.presence.status !== 'offline'){list.push(a.user.username)}});
        message.channel.send(list);
      }
      if (message.content.startsWith("!gonder"))
      {
        var m = message.content.split("!gonder");
        var v = m[1];
        var embed = new RichEmbed()
        .setTitle("Kurallar")
        .setThumbnail('https://raw.githubusercontent.com/erenertugrul/construct-discord-bot/master/src/icon/duyuru.png')
        .setColor("#e41b1b")
        .setDescription(v);
        client.channels.get("622776343901503518").send(embed);
      }
    }
  }
  // selam cevapları
  if (!message.isMentioned("608894953489432616") && message.author.id !="608894953489432616")
  {
    if (message.content.startsWith("selam") || message.content.startsWith("Selam") || message.content.startsWith("Merhaba bot") || message.content.startsWith("merhaba bot"))
    {
      message.channel.send("Merhaba "+message.author.username);
    }
    if (message.content.startsWith("naber") || message.content.startsWith("Naber"))
    {
      message.channel.send("İyi, sen nasılsın "+message.author.username+" ?");
    }
    if (message.content.startsWith("nasılsın") || message.content.startsWith("Nasılsın"))
    {
      message.channel.send("İyi, sen nasılsın "+message.author.username+" ?");
    }
  }

  //çeviri
  else if (message.isMentioned("608894953489432616") && message.author.id !="608894953489432616")
  {
    var m = message.content.split(">");
    var v = encodeURI(m[1]);
    fetch("https://translate.yandex.net/api/v1.5/tr.json/detect?&key="+process.env.ceviri+"&text="+v)
    .then(a=>a.text()).then(function(a)
    {
      var d = JSON.parse(a).lang;
      if (d == "tr")
      {
          fetch("https://translate.yandex.net/api/v1.5/tr.json/translate?key="+process.env.ceviri+"&text="+v+"&lang=tr-en&format=plain").then(a=>a.text()).then(a=>message.reply(JSON.parse(a).text[0]));
      }
      else
      {
          fetch("https://translate.yandex.net/api/v1.5/tr.json/translate?key="+process.env.ceviri+"&text="+v+"&lang=en-tr&format=plain").then(a=>a.text()).then(a=>message.reply(JSON.parse(a).text[0]));
      }
    }).catch(a=>console.log(a));
  }

  // kalp sayar
  const filter = (reaction, user) => {
    return reaction.emoji.name === '❤️' && user.id !== message.author.id;
  };

  const collector = message.createReactionCollector(filter, { time: 7200000 });
  collector.on('collect', (reaction, reactionCollector) => {

  });

  collector.on('end', collected => {
    var id = collected.map(a=>a.message.author.id);
    var ka = parseInt(collected.map(a=>a.count));
    if (id != "")
    {
      try
      {
        firebase.database().ref("discord_userlist/"+id).once("value").then(async (v) =>{
          console.log("hmm :"+id+"kalp: "+ka);
          v.ref.child("kalp").set(parseInt(v.toJSON().kalp)+ka);
        });
      }catch(e){console.log("coll"+e)};
    }
    //else{console.log("bb")};
  });
});
client.on('guildMemberAdd', member => {
  member.guild.channels.get('702951272382464100').send("Construct Türkiye kanalına hoş geldin <@"+ member.user.id +">. Kullanabileceğin komut listesini görmek için !yardım yazabilirsin. :writing_hand: ").then(m =>m.react("👍"));
  firebase.database().ref("discord_userlist").once("value")
  .then(
    function(a){
      if (a.child(member.user.id).val() == null)
      {
        firebase.database().ref("discord_userlist/"+member.user.id).set({"isim":member.user.username,"key":"0","tag":member.user.tag,"durum":"aktif","kalp":0});
      }
      else
      {
        firebase.database().ref("discord_userlist/"+member.user.id).once("value").then(function(a){
          a.ref.child("durum").set("aktif");
        })
      }
    }
  )
});
client.on('guildMemberRemove', member => {
  //member.guild.channels.get('598446314631725057').send("Hoşçakal "+ member.user.tag).then(m =>m.react("😔"));
  firebase.database().ref("discord_userlist/"+member.user.id).once("value").then(function(a){
    a.ref.child("durum").set("ayrildi");
  })
  //member.guild.channels.get('598446314631725057').send("Hoşçakal <@"+ member.user.id +">").then(m =>m.react("😔"));
});

client.on("guildBanRemove", function(guild, member){
    //guild.channels.get('702951272382464100').send("geri gel "+ member.username+"!").then(m =>m.react("😭"));
});

client.on("guildBanAdd", function(guild, member){
  /*if (member.username.length <= 16){
    const canvas = createCanvas(862, 720)
    const ctx = canvas.getContext('2d')
    loadImage("./src/gorsel/banlandi.png").then((image) => {
      ctx.drawImage(image, 0,0, 862, 720);
      ctx.font = "35px Comic Sans MS";
      ctx.fillStyle = "black";
      ctx.fillText(member.username+"'e noldu.", 150, 70);
      guild.channels.get('598446314631725057').send({ files: [{ attachment: canvas.toBuffer(), name: 'ban.png' }] });
    });
  }*/
});

client.on("userUpdate",function(o,n){
  console.log("kullanıcı adı değişti");
  console.log("oo"+o);
  console.log("oo"+o.id);
  console.log("oo"+o.username);
  try{
    firebase.database().ref("discord_userlist/"+o.id).once("value").then(async (v) =>{
     v.ref.update({"isim":o.username});
  })
  }
  catch(e){};
});
client.login(process.env.discord_key);