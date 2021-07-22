module.exports = {
	name: 'clickButton',
	execute(button, channel) {
		if (button.id === "lock") {
			if (!button.guild.me.permissions.has("MANAGE_CHANNELS")) return button.reply.send(":x: Missing Permissions \`Manage Channels\`")
			const db = require('quick.db')
			const id = button.channel.id
			const author = db.get(id + ".author")
			
			if (!process.env.staff) {
				button.channel.overwritePermissions([
     {
       id: button.clicker.user.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
     {
       id: button.guild.roles.everyone.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
    },
  ],
  )
				}
				else {
					button.channel.overwritePermissions([
     {
       id: button.clicker.user.id,
       deny: ['VIEW_CHANNEL', "SEND_MESSAGES"],
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
  )
					}
				
  button.reply.send("You have now locked this ticket to be avaliable to staff only!")
			
			}
		},
};