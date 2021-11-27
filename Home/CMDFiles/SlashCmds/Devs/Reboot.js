module.exports = {
    name : 'reboot',
    description: "Restart the bot.",
    ownerOnly: true,
    run : async(client, interaction, Discord) => {
    	interaction.reply({ content:"Restarting . . ." }).then(() => { 
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
}      