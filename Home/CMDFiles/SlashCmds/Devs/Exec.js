module.exports = {
    name : 'exec',
    ownerOnly: true,
    description: "Execute code in terminal.",
    options: [{
    	name: "code",
    type: "STRING",
    required: true,
    description: "Provide the code to execute."
    	}],
    run : async(client, interaction, Discord) => {
    	 const { exec } = require("child_process")
    const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('evalbtn')
					.setLabel('Delete Output')
					.setStyle('DANGER'),
			);
    	const txt = interaction.options.getString("code") 
    	exec(`${txt}`, (error, stdout) => {
                let response = (error || stdout)
                if (error) {
                    const erro = new Discord.MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('🎄╎  Terminal')
                        .setDescription(`\`\`\`js
${error.message}\`\`\``)
                        .setTimestamp();
                    interaction.reply({ embeds:[erro], components: [row] })
                } else {
                    interaction.reply({ content:`\`\`\`js
${response}\`\`\``, components: [row] })
                }
            })
    }
    }