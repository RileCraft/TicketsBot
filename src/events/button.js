module.exports = {
	name: 'clickButton',
	execute(button, message) {
		try {
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
	channel.send("<@" + button.clicker.user.id + ">")
	})
	} catch (error) {
		console.log(error)
		}
	},
};