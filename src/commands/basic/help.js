const { MessageEmbed } = require('discord.js')
const db = require('quick.db')
module.exports = {
    name : 'help',
    run : async(client, message, args) => {
    	const help = new MessageEmbed()
	.setColor('RANDOM')
	.setThumbnail(client.user.displayAvatarURL({dynamic: true}))
	.setTimestamp()
	.addField("🔮╎Basic Commands", "\`ping , help\`")
	.addField("📕╎Ticket Commands", "\`ticket , close , add , remove ,\`")
	.addField("🎄╎Staff Commands", "\`setup , setcategory\`")
	message.channel.send(help)
    }
} 