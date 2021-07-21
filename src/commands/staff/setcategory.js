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
    .setDescription("No argument for category ID was provided! Please provide the ID of the category where tickets will be created.")
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(noarg)
    }
    else {
    	const cy = message.guild.channels.cache.get(id)
    if (!cy) {
    	const unknown = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle("❌╎Unknown Argument")
    .setDescription("The ID you provided was invalid. Please provide a valid ID.")
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(unknown)
    }
    else if  (cy.type !== "category") {
    	const invalid = new MessageEmbed()
    .setColor("RANDOM")
    .setTimestamp()
    .setTitle("❌╎Invalid Argument")
    .setDescription("The ID you provided was of a non-category channel. Please provide a category id.")
    .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}));
    message.channel.send(invalid)
    	}
    else {
    	
    }
    
    }
    
    }
} 