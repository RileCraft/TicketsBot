module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		client.user.setActivity('Tickets be made.', {
                type: `WATCHING`,
            });
    console.log(`${client.user.tag} has now awakened.`)
	},
};