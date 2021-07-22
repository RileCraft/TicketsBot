const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'ticket',
    run : async(client, message, args) => {
    	if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send(":x: Missing Permissions \`Manage Channels\`")
    if (!db.get("ticket.category")) return message.channel.send("There is no category set yet for tickets! Staff use \`" + process.env.prefix + "setcategory [Category ID]\` to set it!")
    	const name = message.author.username
    if (!process.env.staff) {
    	message.guild.channels.create("ticket-" + name, {
  type: 'text',
  parent: db.get("ticket.category"),
  permissionOverwrites: [
     {
       id: message.author.id,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
     {
       id: message.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
}).then(channel => {
	db.set(channel.id + ".ticket", "true")
	db.set(channel.id + ".author", message.author.id)
	message.channel.send("Here is your ticket: <#" + channel.id + ">")
	const { MessageButton, MessageActionRow } = require('discord-buttons')
let lock = new MessageButton()
  .setStyle('red')
  .setLabel('🔒 Lock this ticket.') 
  .setID('lock') 

let close = new MessageButton()
  .setStyle('blurple')
  .setLabel('🔑 Close this ticket.') 
  .setID('close')

let buttons = new MessageActionRow()
  .addComponents(lock, close);
	
	channel.send("Ticket Control Panel", buttons)
	})
    }
    else {
    message.guild.channels.create("ticket-" + name, {
  type: 'text',
  parent: db.get("ticket.category"),
  permissionOverwrites: [
     {
       id: message.author.id,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
     {
       id: message.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
    {
       id: process.env.staff,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
}).then(channel => {
	db.set(channel.id + ".ticket", "true")
	db.set(channel.id + ".author", message.author.id)
	message.channel.send("Here is your ticket: <#" + channel.id + ">")
	const { MessageButton, MessageActionRow } = require('discord-buttons')
let lock = new MessageButton()
  .setStyle('red')
  .setLabel('🔒 Lock this ticket.') 
  .setID('lock') 

let close = new MessageButton()
  .setStyle('blurple')
  .setLabel('🔑 Close this ticket.') 
  .setID('close')

let buttons = new MessageActionRow()
  .addComponents(lock, close);
	
	channel.send("Ticket Control Panel", buttons)
	})
	}
    }
}