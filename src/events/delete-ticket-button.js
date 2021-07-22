module.exports = {
	name: 'clickButton',
	execute(button, channel) {
		if (button.id === "close") {
			if (!button.guild.me.permissions.has("MANAGE_CHANNELS")) return button.reply.send(":x: Missing Permissions \`Manage Channels\`")
			button.channel.delete()
			}
		},
};