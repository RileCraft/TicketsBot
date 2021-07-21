const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
const { MessageButton } = require("discord-buttons")
module.exports = {
    name : 'setup',
    run : async(client, message, args) => {
    	if (!message.member.roles.cache.has(process.env.staff)) return message.channel.send(":x: You don't have the required permission to run this command")
    let button = new MessageButton()
  .setStyle('blurple')
  .setLabel('Open Ticket') 
  .setID('button');

message.channel.send('Interact with the button to create a ticket!', button);
    }
} 