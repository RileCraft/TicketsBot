const { MessageEmbed } =require('discord.js')
module.exports = {
    name : 'exec',
    run : async(client, message, args) => {
                const { MessageEmbed } = require('discord.js')
        const env = require("dotenv").config()
        if (message.author.id === process.env.dev) {
            const { exec } = require("child_process")
            const prefix = process.env.prefix
            const msg = args.join(" ")
            exec(msg, (error, stdout) => {
                let response = (error || stdout)
                if (error) {
                    const erro = new MessageEmbed()
                        .setColor('RANDOM')
                        .setTitle('🎄╎Terminal')
                        .setDescription(`\`\`\`kt
${error.message}\`\`\``)
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
                }
            })
        }
        else {
            const f = new MessageEmbed()
                .setColor('RANDOM')
                .setTitle('❌╎Error Happened')
                .setDescription('You dont have the required permission to do this!');
            message.channel.send(f)
        }
    }
}