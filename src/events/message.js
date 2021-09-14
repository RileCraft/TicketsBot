module.exports = {
	name: 'message',
	execute(message) {
		(async () => {
			const { client } = require("../../index")
			const { MessageEmbed } = require('discord.js')
			const prefix = process.env.prefix
if(message.author.bot) return;
    if(!message.content.toString().toLowerCase().startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const cmd = message.content.toString().toLowerCase().split(prefix)[1].trim().split(" ")[0]
    if(cmd.length === 0) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
    	let args = message.content.slice(prefix.length).trim()
    if (args.startsWith(command.name)) args = args.slice(command.name.toString().length).trim().split(" ")
    else args = args.slice(command.aliases.toString().length).trim().split(" ")
    // Timeout Handler
if (command.timeout) {
                                if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
                                command.run(client, message, args, db, MessageEmbed)
                                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
                                setTimeout(() => {
                                    Timeout.delete(`${command.name}${message.author.id}`)
                                }, command.timeout)
                        } 
                        // OwnerOnly Handler
else if (command.ownerOnly) {
	if (message.author.id != process.env.dev) return message.channel.send("❌╎ This command is to be used by the developers / owners of the bot only!")
	command.run(client, message, args, db, MessageEmbed)
	}
else { 
// If none of the handlers are there.
command.run(client, message, args, db, MessageEmbed)
}}
})()
}}