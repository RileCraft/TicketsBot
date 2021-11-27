module.exports = {
    name: "ticket",
    guild: "705681476674650143",
    options: [{
        name: "setcategory",
        options: [{
            name: "category",
            description: "Choose the category.",
            type: "CHANNEL",
            required: true
        }],
        description: "Set the category for new tickets.",
        type: "SUB_COMMAND"
    }, {
        name: "new",
        description: "Open a new ticket.",
        type: "SUB_COMMAND"
    }, {
        name: "setup",
        options: [{
            name: "message",
            description: "Provide what should the message be for the button message.",
            required: true,
            type: "STRING"
        }],
        description: "Setup the button for ticket creation.",
        type: "SUB_COMMAND"
    }, {
        name: "setlogs",
        options: [{
            name: "channel",
            description: "Choose the text channel for logs.",
            type: "CHANNEL",
            required: true
        }],
        description: "Setup a channel for ticket logs.",
        type: "SUB_COMMAND"
    }],
    run: async (client, interaction, Discord) => {
const subcmd = interaction.options.getSubcommand()
if (subcmd == "setup") await require(`${__dirname}/setupButton`).run(client, interaction, Discord)
else if (subcmd == "new") await require(`${__dirname}/newTicket`).run(client, interaction, Discord)
else if (subcmd == "setcategory") await require(`${__dirname}/setCategory`).run(client, interaction, Discord)
else if (subcmd == "setlogs") await require(`${__dirname}/setLogging`).run(client, interaction, Discord)
    }
}