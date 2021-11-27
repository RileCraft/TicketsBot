module.exports = {
    name : 'help',
    description: "View all our commands!",
    run : async(client, interaction, Discord) => {
    	const embed = new Discord.MessageEmbed()
    .setTimestamp()
    .setColor("RANDOM")
    .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({dynamic: true}))
    .setDescription("Interact with the menu below to access our commands.")
    const menus = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('help')
					.setPlaceholder('Avaliable Commands')
					.addOptions([
					{
							label: '🛠 HomePage',
							description: 'Return back to homepage.',
							value: 'home',
						},
						{
							label: '🎄Basic Commands',
							description: 'Normal commamds which can be used by anyone.',
							value: 'basic',
						},
						{
							label: '🎫 Ticket Commands',
							description: 'Tickets related commands.',
							value: 'ticket',
						}
					]),
			);
const message = await interaction.reply({ embeds:[embed], components:[menus], fetchReply: true })
const collector = message.createMessageComponentCollector({ componentType: "SELECT_MENU", time: 60000})

collector.on("collect", msg => {
if (msg.values[0] == "home") msg.update({ embeds: [embed] })
else if (msg.values[0] == "basic") {
		const basicEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setAuthor(msg.user.tag, msg.user.displayAvatarURL({dynamic: true}))
		.setDescription("`help , ping`")
		.setTimestamp()
		msg.update({ embeds: [basicEmbed] })
}
else if (msg.values[0] == "ticket") {
	const imgEmbed = new Discord.MessageEmbed()
		.setColor("RANDOM")
		.setAuthor(msg.user.tag, msg.user.displayAvatarURL({dynamic: true}))
		.setDescription("`ticket setlogs , ticket setup , ticket new , ticket setcategory`")
		.setTimestamp()
		msg.update({ embeds: [imgEmbed] })
	}
	})
	collector.on('end', collected => {
    const updatedMenu = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageSelectMenu()
					.setCustomId('help')
					.setDisabled()
					.setPlaceholder('Avaliable Commands')
					.addOptions([
					{
							label: '🛠 HomePage',
							description: 'Return back to homepage.',
							value: 'home',
						},
						{
							label: '🎄Basic Commands',
							description: 'Normal commamds which can be used by anyone.',
							value: 'basic',
						},
						{
							label: '🎫 Ticket Commands',
							description: 'Tickets related commands.',
							value: 'ticket',
						}
					]),
			);
	interaction.editReply({ components:[updatedMenu] })
})

    }
} 