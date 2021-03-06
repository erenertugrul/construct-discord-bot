/**
 * Created by Armaldio on 11/12/2017.
 */
const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const duplicateMessage = async (
  msg,
  toChannelId,
  contentEditor,
  includeAttachments = true,
) => {
      // Makes it easier to get the channels rather than doing the msg.mentions.channels thing
  const toChannel = msg.guild.channels.get(toChannelId);
  if (!toChannel) {
    console.log('kanal bulunamadı');
    return;
  }

  let wb;
  const wbs = await toChannel.fetchWebhooks();
  if (wbs.size < 20) wb = await toChannel.createWebhook('Mesaj taşıma');

  try {
    const options = {
      username: msg.author.username,
      avatarURL: msg.author.avatarURL,
    };

    if (includeAttachments) {
      if (msg.embeds !== null) options.embeds = msg.embeds;
      if (msg.attachments.array().length > 0) options.files = [new Discord.Attachment(msg.attachments.first().url, msg.attachments.first().filename)];
    }

    const message = await wb.send(contentEditor(msg.content || ''), options);
    await wb.delete('tamam');
    return message;
  } catch (e) {
    await wb.delete('tamam');
    console.log(e);
  }
};

module.exports= class tasi extends Command {
  constructor(client) {
    super(client, {
      name: 'taşı',
      memberName: 'tasi',
      group: 'yonetim',
      description: 'mesajları başka kanala taşır',
      examples: ['tasi 10 #kanaladi'],
      extraArgs: false,
      deleteCmd: true,
      args: [
        {
          key: 'amount',
          prompt: 'kac mesaj taşınsın?',
          type: 'integer',
        },
        {
          key: 'channel',
          prompt: 'Hangi kanala taşınsın',
          type: 'channel',
        },
      ],
    });
  }

  // eslint-disable-next-line
  async run(msg, { amount, channel }) {
    if ((msg.author.id == "174242106766786570") || (msg.author.id == "478933409276624896") || (msg.author.id == "579257592430460929") || (msg.author.id == "350009686117974037")|| (msg.author.id == "531086739876478976") || (msg.author.id == "196754325794455552") || (msg.author.id == "286916244840382464"))
    {
      if (amount <= 0 || amount >= 100) {
        msg.author.send('Mesaj sayısı 0 ile 100 arasında olmalıdır');
        return;
      };

      let messages = await msg.channel.fetchMessages({ limit: amount + 1 });
      messages = messages
        .filter((m) => m.id !== messages.first().id)
        .sort((a, b) => a.createdTimestamp - b.createdTimestamp);
        //console.log(messages);
      // messages.shift();
      // messages = messages.reverse();
        //console.log(`Copying ${messages.size} messages`);
        // eslint-disable-next-line
        for (let m of messages.values()) {
          // eslint-disable-next-line
          await duplicateMessage(m, channel.id, content => content);
          //console.log(m.cleanContent);
        };
        //const msgDel = await msg.author.send(text);
        await Promise.all(messages.map((m) => m.delete().then(() => {
          //msgDel.edit(`${text} ${++x}/${messages.array().length}`);
        })));
        const sent = await msg.channel.send(`${messages.array().length} mesaj <#${channel.id}> kanalına taşındı. Lütfen ordan devam edin.`);
        sent.delete(300000);
    };
  };
}
