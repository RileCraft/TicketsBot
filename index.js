const chalk = require('chalk')
global.db = require('quick.db')
const {Collection, Client, Discord} = require('discord.js')
const fs = require('fs')
const ms = require('ms')
const { MessageEmbed } = require('discord.js')
const Timeout = new Collection();
const env = require("dotenv").config()
const client = new Client({
    disableEveryone: true
})
exports.client = client
require('discord-buttons')(client);
const prefix = process.env.prefix
const token = process.env.token
client.commands = new Collection();
client.aliases = new Collection();

const glob = require("glob");
let getDirectories = function (src, callback) {
  glob(src + '/**/*', callback);
};
getDirectories(__dirname + '/src/commands', function (err, res) {
  res.forEach(file => {
  let path = file.toString()
  if (fs.statSync(path).isDirectory()) return;
  const cmdhandler = require(path)
  let name = cmdhandler.name
  client.commands.set(name, cmdhandler)
  if(cmdhandler.aliases && Array.isArray(cmdhandler.aliases)) cmdhandler.aliases.forEach(alias => client.aliases.set(alias, name))
  	})
});

const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}
client.login(token)
