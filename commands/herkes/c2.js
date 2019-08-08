const { Command } = require('discord.js-commando');
//const path = require('path');
const scirra = require('../../construct.js');
var firebase = require('firebase');
 class c2 extends Command
{
	constructor(client)
	{
		super(client,{
            name: 'c2',
            group: 'herkes',
            memberName: 'c2',
            description: 'c2 sürümünü öğrenirsin.',
            examples: ['c2'],

		})
	}
    /*
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
    }*/

    run(msg) {
        return scirra.komut_c2(msg);
        //return msg.say('Hi, I\'m awake!');
    }
}


module.exports = c2;