module.exports = {
    name: "closeTicket",
    run: async(client, interaction, Discord) => {
        const author = interaction.guild.members.cache.get(interaction.channel.name.split("-")[1])
        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTimestamp()
        .setTitle("Ticket Logs")
        .addFields({
            name: "Creator",
            value: author.user.tag
        }, {
            name: "Closed by",
            value: interaction.user.tag
        }, {
            name: "Guild",
            value: interaction.guild.name
        }, {
            name: "Timestamp",
            value: `<t:${Math.floor(Date.now() / 1000)}>`
        });
        author.send({
            embeds: [embed]
        })
        const logs = await db.get(`${interaction.guild.id}.TicketSystem.LoggingChannel`)
        if (logs) interaction.guild.channels.cache.get(logs).send({ embeds: [embed] })
        interaction.channel.delete()
        await db.set(`${interaction.guild.id}.TicketSystem.${author.user.id}`, false)
    }
}