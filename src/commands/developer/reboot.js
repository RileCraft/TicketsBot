const { MessageEmbed } =require('discord.js')
module.exports = {
    name : 'reboot',
    run : async(client, message, args) => {
        if (message.author.id === process.env.rile) {
        	message.channel.send("Restarting . . .").then(() => { 
process.on("exit", () => {
    require("child_process").spawn(process.argv.shift(), process.argv, {
        cwd: process.cwd(),
        detached: true,
        stdio: "inherit",
    });
});
process.exit();
})
        }
        else {
        	const lang = new MessageEmbed()
	.setColor('RANDOM')
	.setAuthor(message.author.tag , 'https://cdn.discordapp.com/avatars/' + message.author.id + '/'  + message.author.avatar + ".webp")
	.setTimestamp()
	.setDescription('Developer only.');
	message.channel.send(lang)
        }
    }
}