module.exports = {
    name: "setCategory",
    ignoreFile: true,
    run: async(client, interaction, Discord) => {
        const author = interaction.user
        const category = interaction.guild.channels.cache.get(interaction.options.getChannel("category").id)
        if (!interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({ content: "You require the permission `MANAGE_CHANNELS` to be able to set the category." })
        if (category.type != "GUILD_CATEGORY") return interaction.reply({ content: "Please select a category only.", ephemeral: true })

        const embed = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setAuthor(author.tag, author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setDescription(`Successfully set the **${category.name}** as the new category where all new tickets will be created from now.`);
        interaction.reply({
            embeds: [embed]
        })
        await db.set(`${interaction.guild.id}.TicketSystem.CategoryID`, category.id)
    }
}