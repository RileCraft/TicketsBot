module.exports = {
    name : 'eval',
    ownerOnly: true,
    description: "Evaluate JS Code.",
    options: [{
    	name: "code",
    type: "STRING",
    required: true,
    description: "Provide the code to eval."
    	}],
    run : async(client, interaction, Discord) => {
    	let txt = interaction.options.getString("code")
    const row = new Discord.MessageActionRow()
			.addComponents(
				new Discord.MessageButton()
					.setCustomId('evalbtn')
					.setLabel('Delete Output')
					.setStyle('DANGER'),
			);
			const { inspect } = require('util')
   try{
       const evaled = eval(txt)
       let ff = inspect(evaled, { depth: 0})
       if (String(ff).length > 2000) ff = "Output is too long"
        interaction.reply({ content:`\`\`\`js\n${ff}\`\`\``, components: [row] })
   } catch (error){
       let embed1 = new Discord.MessageEmbed()
       .setTitle('Evaluation Error!')
       .setColor("RANDOM")
       .addField("❌╎ Error",`${error}`)
       interaction.reply({embeds: [embed1], components: [row] })
   }
    }
}      