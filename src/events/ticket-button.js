module.exports = {
	name: 'clickButton',
	execute(button, message) {
		if (button.id === "open") {
		if (!button.guild.me.permissions.has("MANAGE_CHANNELS")) return button.reply.send(":x: Missing Permissions \`Manage Channels\`")
		try {
			const db = require('quick.db')
		if (!db.get("ticket.category")) return button.reply.send("There is no category set yet for tickets! Staff use \`" + process.env.prefix + "setcategory [Category ID]\` to set it!")
    if (!button.guild.channels.cache.get(db.get("ticket.category"))) return button.reply.send("The category ID setuped is not invalid! Please set a valid ID using \`" + process.env.prefix + "setcategory [ID]\`")
		if (!process.env.staff && !button.guild.roles.cache.get(process.env.staff)) {
		const name = button.clicker.user.username
    button.guild.channels.create("ticket-" + name, {
  type: 'text',
  parent: db.get("ticket.category"),
  permissionOverwrites: [
     {
       id: button.clicker.user.id,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
     {
       id: button.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
}).then(channel => {
	db.set(channel.id + ".ticket", "true")
	db.set(channel.id + ".author", button.clicker.user.id)
	button.reply.send("Here is your ticket: <#" + channel.id + ">", true)
	
	const { MessageButton, MessageActionRow} = require('discord-buttons')
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
					const db = require('quick.db')
		const name = button.clicker.user.username
    button.guild.channels.create("ticket-" + name, {
  type: 'text',
  parent: db.get("ticket.category"),
  permissionOverwrites: [
     {
       id: button.clicker.user.id,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
     {
       id: button.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
    {
       id: process.env.staff,
       allow: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
}).then(channel => {
	db.set(channel.id + ".ticket", "true")
	db.set(channel.id + ".author", button.clicker.user.id)
	button.reply.send("Here is your ticket: <#" + channel.id + ">", true)
	
	const { MessageButton, MessageActionRow} = require('discord-buttons')
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
	} catch (error) {
		console.log(error)
		}
		}
	},
};