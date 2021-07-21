const { MessageEmbed } =require('discord.js')
const { exec } = require("child_process")
module.exports = {
    name : 'reload',
    run : async(client, message, args) => {
    	 const glob = require('glob')
    	if (message.author.id === process.env.rile) {
    	const prefix = process.env.prefix
            exec(`git pull $url`, (error, stdout) => {
                let response = (error || stdout)
                if (error) {
                    const erro = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('🎄╎Terminal')
                        .setDescription(`\`\`\`kt${error.message}\`\`\``)
                        .setTimestamp();
                    message.channel.send(erro)
                } else {
                    const result = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('🎄╎Terminal')
                        .setDescription(`\`\`\`kt
${response}\`\`\``)
                        .setTimestamp();
                    message.channel.send(result)
                    client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return message.reply(
                new MessageEmbed()
                    .setTitle("Reload Error")
                    .setDescription(`\`\`\`${err.stack}\`\`\``)
                    .setColor("ff0000")
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
            );
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];
                let pull = require(file);

                if (pull.name) {
                    client.commands.set(pull.name, pull);
                }

                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name)
                    })
                }
            })
        })

        message.reply(
            new MessageEmbed()
                .setTitle('Reload Success!')
                .setColor('GREEN')
                .setTimestamp()
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
        )
                }
            })
        }
        else {
        	const ye = new MessageEmbed()
	.setColor('RANDOM')
	.setAuthor(message.author.tag , 'https://cdn.discordapp.com/avatars/' + message.author.id + '/'  + message.author.avatar + ".webp")
	.setTimestamp()
	.setDescription("You don't have the required permission.");
	message.channel.send(ye)
        	}
    }
}