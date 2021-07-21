const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'setcategory',
    run : async(client, message, args) => {
    	if (!message.member.roles.cache.has(process.env.staff)) return message.channel.send(":x: You don't have the required permission to run this command")
    const id = args[0]
    if (!id) {
    	const noarg = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle("❌╎No Argument")
    .setDescription()
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(noarg)
    }
    }
} 