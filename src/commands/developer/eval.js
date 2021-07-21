const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'eval',
    run : async(client, message, args) => {
        const evalcommand = args.slice(0).join(" ")
   const { inspect } = require('util')
   if(message.author.id !== process.env.dev) return message.channel.send(`This command can only be used by Developers`)

   if(!evalcommand)return message.channel.send("Please specify something to Evaluate")
                                                                                              
   try{
       const evaled = eval(evalcommand)                      

       let evalembed = new MessageEmbed()
       .setColor('RANDOM')
       .setTitle('🎄╎Evaluated')
       .addField(`📭╎Input`, `\`\`\`kt\n${evalcommand}\`\`\``)
       .addField(`📡╎Output`,`\`\`\`kt\n${inspect(evaled, { depth: 0})}\`\`\``)
       .addField(`❔╎TypeOf`,`\`\`\`${typeof(evaled)}\`\`\``)
       
        lmao = await message.channel.send(evalembed)
       lmao.react("🗑").then(() => {
       const filter = (reaction, user) => {
			return reaction.emoji.name === "🗑" && user.id === message.author.id;
		};

		lmao.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '🗑') {
					const m = lmao.id
					message.channel.messages.cache.get(m).delete()
				}
			})
			.catch(error => {
				console.log(`${error.stack}`);
			});
			})
   } catch (error){
       let embed1 = new MessageEmbed()
       .setTitle('❌╎Evaluation Error!')
       .setColor("RANDOM")
       .addField(`❌╎Error`,`${error}`)
     lmao = await message.channel.send(embed1)
       lmao.react("🗑").then(() => {
       const filter = (reaction, user) => {
			return reaction.emoji.name === "🗑" && user.id === message.author.id;
		};

		lmao.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
			.then(collected => {
				const reaction = collected.first();

				if (reaction.emoji.name === '🗑') {
					const m = lmao.id
					message.channel.messages.cache.get(m).delete()
				}
			})
			.catch(error => {
				console.log(`${error.stack}`);
			});
			})
   }
    }
}