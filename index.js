const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const env = require("dotenv").config()
const ms = require('ms')
const Timeout = new Collection();
const client = new Client({
    disableEveryone: true
})
const disbut = require("discord-buttons");
disbut(client);
const token = process.env.token
const prefix = process.env.prefix
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./src/commands/");
["command"].forEach(handler => {
    require(`./src/handlers/${handler}`)(client);
}); 

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./src/events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

client.on('message', async message =>{
    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.guild) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if(cmd.length == 0 ) return;
    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd));
    if(command) {
if (command.timeout) {
                                if (Timeout.has(`${command.name}${message.author.id}`)) return message.channel.send(`You are on a \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` cooldown.`)
                                command.run(client, message, args)
                                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
                                setTimeout(() => {
                                    Timeout.delete(`${command.name}${message.author.id}`)
                                }, command.timeout)
                        }else {
command.run(client, message, args)
} }
})
client.login(token)
const pinger = require("simple-website-pinger")

pinger.webserver(3000)

pinger.ping("https://ticketsbot.rilecraft.repl.co:3000")

client.on('clickButton', async (button) => {
   
});