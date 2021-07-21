const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'ticket',
    run : async(client, message, args) => {
    	const name = message.author.username
    message.guild.channels.create("ticket-" + name, {
  type: 'text',
  permissionOverwrites: [
     {
       id: message.author.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
}).then(channel => {
	const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setTimestamp()
	.setDescription("<#" + channel.id + ">");
	message.channel.send(embed)
	})
    }
} 