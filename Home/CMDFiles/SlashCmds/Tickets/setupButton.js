module.exports = {
    name: "setupButton",
    ignoreFile: true,
    run: async(client, interaction, Discord) => {
        const author = interaction.member
        if (!author.roles.cache.has(config.staff)) return interaction.reply({ content: `<@${author.user.id}>, This option is for the staff only.` })
        const button = new Discord.MessageActionRow().addComponents(
            new Discord.MessageButton()
            .setStyle("PRIMARY")
            .setLabel("Interact to open a ticket.")
            .setEmoji("🎫")
            .setCustomId("newTicket")
        )
        interaction.reply({
            content: "Done",
            ephemeral: true
        })
        interaction.channel.send({
            content: interaction.options.getString("message"),
            components: [button]
        })
    }
}