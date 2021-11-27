module.exports = {
    name: "lockTicket",
    run: async(client, interaction, Discord) => {
        const author = interaction.member
        if (!author.roles.cache.has(config.staff)) return interaction.reply({ content: `<@${author.user.id}>, This option is for the staff only.` })
        interaction.channel.permissionOverwrites.set([{
            id: interaction.guild.id,
            deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
        }, {
        id: interaction.channel.name.split("-")[1],
        deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "CREATE_INSTANT_INVITE", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS"]
        }, {
            id: config.staff,
            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "CREATE_INSTANT_INVITE", "EMBED_LINKS", "ATTACH_FILES", "READ_MESSAGE_HISTORY", "USE_EXTERNAL_EMOJIS", "USE_EXTERNAL_STICKERS"]
        }])
        interaction.reply({
            content: "Successfully locked the ticket!"
        })
        interaction.guild.members.cache.get(interaction.channel.name.split("-")[1]).send({
            content: `Your ticket was locked by ${author.user.tag} in ${interaction.guild.name}, You cannot create another ticket until they delete your ticket.`
        })
    }
}