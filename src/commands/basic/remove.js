const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'add',
    run : async(client, message, args) => {
    	if (!message.guild.me.permissions.has("MANAGE_CHANNELS")) return message.channel.send(":x: Missing Permissions \`Manage Channels\`")
    	const id = message.channel.id 
    if (!db.get(id + ".ticket")) {
    	const unknown = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle("❌╎Invalid Usage")
    .setDescription("The channel you are trying to run this command in is not a ticket. Please use this command in tickets only!")
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(unknown)
    }
else {
	const user = args[0]
	if (!user) return message.channel.send("Please provide the user ID of the person that you want to remove from the ticket!")
	if (isNaN(user)) return message.channel.send("Invalid user ID provided.")
	if (!client.users.cache.get(user)) return message.channel.send("Invalid user ID provided.")
    	message.channel.updateOverwrite(user, {
  SEND_MESSAGES: false,
  VIEW_CHANNEL: false
})
const embed = new MessageEmbed()
	.setColor('RANDOM')
	.setTimestamp()
	.setDescription('Removed <@' + user + "> (" + client.users.cache.get(user).tag + ") from the ticket!");
	message.channel.send(embed)
    }
    
    }
} 