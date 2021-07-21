module.exports = {
	name: 'clickButton',
	execute(button) {
		if (button.id === "button") {
button.send("hi")
}
	},
};