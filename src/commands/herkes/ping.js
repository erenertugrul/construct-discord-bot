const { oneLine } = require('common-tags');
const { Command } = require('discord.js-commando');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'araclar',
			memberName: 'ping',
			description: 'Discord sunucusuna ping at',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		if(!msg.editable) {
			const pingMsg = await msg.reply('Pingleniyor...');
			return pingMsg.edit(oneLine`
				${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
				Pong! Mesajın gitmesi ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.
				${this.client.ping ? `Gelmesi ${Math.round(this.client.ping)}ms. sürmüştür` : ''}
			`);
		} else {
			await msg.edit('Pingleniyor...');
			return msg.edit(oneLine`
				Pong! Mesajın gitmesi ${msg.editedTimestamp - msg.createdTimestamp}ms.
				${this.client.ping ? `Gelmesi ${Math.round(this.client.ping)}ms. sürmüştür` : ''}
			`);
		}
	}
};
