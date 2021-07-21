const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'ticket',
    run : async(client, message, args) => {
    	const name = message.author.username
    message.guild.channels.create("ticket-" + name, {
  type: 'text',
  parent: "772829053861888050",
  permissionOverwrites: [
     {
       id: message.author.id,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
       id: message.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
}).then(channel => {
	message.channel.send("Here is your ticket: <#" + channel.id + ">")
	})
    }
} 