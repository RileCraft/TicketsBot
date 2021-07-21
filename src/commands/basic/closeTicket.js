const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'close',
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
	message.channel.delete()
	}
	
    }
} 