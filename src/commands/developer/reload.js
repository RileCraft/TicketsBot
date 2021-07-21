const { MessageEmbed } =require('discord.js')
module.exports = {
    name : 'reload',
    run : async(client, message, args) => {
        const glob = require("glob")
        if(message.author.id !== process.env.dev) return message.channel.send(`This command can only be used by Developers`)
    	client.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async (err, filePaths) => {
            if (err) return message.reply(
                new MessageEmbed()
                    .setTitle(ErrorEmote + ` Reload Error`)
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
}