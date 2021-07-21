const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'setcategory',
    run : async(client, message, args) => {
    	if (!message.member.roles.cache.has(process.env.staff)) return message.channel.send(":x: You don't have the required permission to run this command")
    message.reply("a")
    }
} 