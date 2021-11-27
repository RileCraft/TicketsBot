const { Collection, Client, Discord, MessageEmbed, Intents } = require('discord.js')
global.HOME = __dirname
global.config = require(HOME + "/Home/Storage/Vault/Config")
const client = new Client({
    intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_BANS,
],
partials: ["CHANNEL"]
})
global.HOME = __dirname
client.login(config.token)
global.db = require("quick.db")
exports.client = client
client.commands = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection()
client.events = new Collection()
client.selectMenus = new Collection()
client.buttonCommands = new Collection()

const { Handler } = require(`${HOME}/Home/Classes/Handler`)
Handler.loadCommands(client) // COMMAND HANDLER
Handler.loadEvents(client) // EVENT HANDLER
Handler.slashCount()
Handler.loadButtons(client) // BUTTON HANDLER
Handler.loadSelectMenus(client) // SELECTMENUS HANDLER
Handler.loadErrorManager(client) // ERRORHANDLER HANDLER