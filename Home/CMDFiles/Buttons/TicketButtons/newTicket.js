module.exports = {
    name: "newTicket",
    run: async(client, interaction, Discord) => {
        const categoryID = await db.get(`${interaction.guild.id}.TicketSystem.CategoryID`)
        if (!categoryID) return interaction.reply({ content: "No category Id has been setup by the staff. If you're staff then use `ticket setCategory (SlashCmd)`." })
        const author = interaction.user
        if (!interaction.guild.me.permissions.has("MANAGE_CHANNELS")) return interaction.reply({ content: "I require the permission `MANAGE_CHANNELS` to be able to manage the tickets." })
        if (await db.get(`${interaction.guild.id}.TicketSystem.${author.id}`)) return interaction.reply({ content: "You already have a ticket open!", ephemeral: true })
        if (interaction.guild.channels.cache.get(categoryID)?.type != "GUILD_CATEGORY") return interaction.reply({ content: "Invalid category id was given for ticket creation." })

       const ticket = await interaction.guild.channels.cache.get(categoryID).createChannel(`ticket-${author.id}`, {
            type: "GUILD_TEXT",
            permissionOverwrites: [{
                id: interaction.guild.id,
                deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
            }, {
            id: author.id,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CREATE_INSTANT_INVITE", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS"]
            }, {
                id: config.staff,
                allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CREATE_INSTANT_INVITE", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS"]
            }]
        })
        await db.set(`${interaction.guild.id}.TicketSystem.${author.id}`, true)
        interaction.reply({
            content: `Your ticket has been created at <#${ticket.id}>`,
            ephemeral: true
        })
        const buttons = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
            .setStyle("DANGER")
            .setLabel("Close Ticket")
            .setEmoji("❌")
            .setCustomId("closeTicket"),
            new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setEmoji("🔒")
            .setLabel("Lock Ticket")
            .setCustomId("lockTicket")
        )
        ticket.send({
            content: "Ticket Control Center. Interaction with the button to manage the ticket.",
            components: [buttons]
        })
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setTitle("Ticket Logs")
        .addFields({
            name: "Opened by",
            value: author.tag
        }, {
            name: "Timestamp",
            value: `<t:${Math.floor(Date.now() / 1000)}>`
        });
        const logs = await db.get(`${interaction.guild.id}.TicketSystem.LoggingChannel`)
        if (logs) interaction.guild.channels.cache.get(logs).send({ embeds: [embed] })
    }
}