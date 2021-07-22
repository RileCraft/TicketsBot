const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    usage: "s!ping",
description: "Shows the latency of Bot and the Websocket.",
    run : async(client, message, args) => {
        const ping = new MessageEmbed()
	.setColor('RANDOM')
	.setTimestamp()
        .setTitle('🏓╎Pong!')
	.setDescription('🏠╎Websocket Latency:' + " " + client.ws.ping + "ms" + '\n🤖╎Bot Latency:' + " " + `${Date.now() - message.createdTimestamp}` + "ms");
	message.channel.send(ping)
    }
}