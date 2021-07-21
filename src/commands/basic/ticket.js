const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'ticket',
    run : async(client, message, args) => {
    	const name = message.author.username
    message.guild.channels.createChannel("ticket-" + name, "text").then(channel => {
    	channel.setParent("772829053861888050")
    })
    }
} 