module.exports = {
    name: "setLogging",
    ignoreFile: true,
    run: async(client, interaction, Discord) => {
        const channel = interaction.guild.channels.cache.get(interaction.options.getChannel("channel").id)
        if (channel.type != "GUILD_TEXT") return interaction.reply({ content: "Please provide a text channel.", ephemeral: true })
        await db.set(`${interaction.guild.id}.TicketSystem.LoggingChannel`, channel.id)
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
        .setDescription(`Successfully set the ticket logging channel to <#${channel.id}>`);
        interaction.reply({
            embeds: [embed]
        })
    }
}