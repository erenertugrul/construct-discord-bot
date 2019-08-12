const { Command } = require('discord.js-commando');
//const path = require('path');
const scirra = require('../../construct.js');
var firebase = require('firebase');
 class c3 extends Command
{
	constructor(client)
	{
		super(client,{
            name: 'c3',
            group: 'herkes',
            memberName: 'c3',
            description: 'c3 sürümünü öğrenirsin.',
            examples: ['c3'],
		})
	}
    /*
    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
    }*/

    run(msg) {
        return scirra.komut_c3(msg);
        //return msg.say('Hi, I\'m awake!');
    }
}


module.exports = c3;