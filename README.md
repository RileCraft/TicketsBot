# TicketsBot
## Features:
* Buttons Menus
* Easily configurable code
* Uses .env for more security
* Uses quick.db for faster response. (Easily changeable to quickmongo)
* Simple to use and nothing fancy
* Command & Event Handler

## Setup:
* NodeJS V12 and above required.
* Required Bot Permissions: `Manage Channels`, `Send Messages`, `View Channel`

### Env File Details
* `token` - Your discord bot token.
* `prefix` - Your discord bot prefix.
* `dev` - The user ID of the owner of bot.
* `staff` - The Role ID of the role that will be given access to new tickets. If this is empty or invalid role ID was provided then the bot take people with `ADMINISTRATOR` Permission as staff instead. 

### Installation
* Goto your terminal and run the command `npm i`. This will install all the packages from `package.json`.
* Fill the .env file.
* Edit anything if you want to.
* Done.

## Commands Information
* `help` - The main help page command to navigate you through commands.
* `ping` - This will reveal the bot and the API latency.
* `ticket` - This will open a new ticket in the set category ID (if set yet).
* `close` - This will close the ticket in which the command was ran in.
* `add` - This will add the provided user ID to the current ticket.
* `remove` - This will remove the provided user ID from the current ticket.
* `setcategory` - This will set the category from the provided category ID where tickets will be created.
* `setup` - This will make a ticket button creator message. Whenever someone will click that button it will create a ticket.
* `eval` - Evals a JS/DJS code.
* `reload` - Reloads all the commands.
* `exec` - Executes a command in the terminal.
* `reboot` - Restarts the bot.

## Developer Information
* RileCraft#5713
* API: https://shit-api.ml