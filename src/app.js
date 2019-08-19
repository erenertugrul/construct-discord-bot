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

client.registry.registerDefaultGroups().registerDefaultTypes().registerDefaultCommands({help:false, prefix:false, ping:true, eval_:false, commandState:false}).registerGroups([['herkes', 'herkes kullanabilir']]).registerCommandsIn(path.join(__dirname, 'commands'));

client.on("ready",() => {
  console.log("hazir");
  setInterval(() => scirra.check_c2(client), 600000);
  setInterval(() => scirra.check_c3(client), 600000);
  scirra.check_c2(client);
  scirra.check_c3(client);
});

client.on("message",(message) => {
  if (message.content.startsWith("selam"))
  {
    message.channel.send("Merhaba "+message.author.username);
  }
    if (message.channel.type == "dm")
    {
      if (message.content.startsWith("naber"))
        {
        message.author.send("iyi :(")
      }
    }
});
client.on('guildMemberAdd', member => {
   member.guild.channels.get('598446314631725057').send("Hoşgeldin <@"+ member.user.id +">");
});
client.login(process.env.discord_key);