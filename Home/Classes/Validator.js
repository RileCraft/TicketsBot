const { client } = require(HOME + "/bot")
let missingUserPermissions = []
let missingClientPermissions = []
let missingAnyUserPermissions = []
let missingAnyClientPermissions = []
let missingUsers = []
let missingRoles = []
let missingChannels = []
let missingGuilds = []

/*
You have to pass these values in the function:-
command = The required file.
Eg: let a = require(path to file)

message = This is the message from the messageCreate or pass interaction from interactionCreate event.
isInt = true / false. If this is a interactionCreate or messageCreate event commands.
whInt = What type of interaction is this. Leave blank if messageCreate event.
options:
• slash
• select
• button
*/
class validator {

    static cooldown(command, message, isInt, whInt) {
        if (command.cooldown) {
            if (isInt && whInt) {
                let time = command.cooldown
                let id = message.user.id
                let date = Date.now()
                let data = db.get(`${id}.${command.name}.${whInt}.cooldown`)
                if (isNaN(time)) throw new Error("Invalid number in cooldown provided at " + command.name)
                if (Math.floor(date - data) >= time || !data) {
                    db.set(`${id}.${command.name}.${whInt}.cooldown`, date)
                    return true
                } else return false
            } else {
                let time = command.cooldown
                let id = message.author.id
                let date = Date.now()
                let data = db.get(`${id}.${command.name}.cooldown`)
                if (isNaN(time)) throw new Error("Invalid number in cooldown provided at " + command.name)
                if (Math.floor(date - data) >= time || !data) {
                    db.set(`${id}.${command.name}.cooldown`, date)
                    return true
                } else return false
            }
        }
        return true
    } //Cooldown end
    
    static expireAfter(command, message, whInt) {
    if (!command.expireAfter) return true;
    if (!whInt) throw new Error("Please provide what type of interaction is this.")
    const time = command.expireAfter
    const date = Date.now()
    const setValue = db.get(`${command.name}.${whInt}.expire`)
    if (!setValue) {
        db.set(`${command.name}.${whInt}.expire`, date)
        return true;
    }
    if (Math.floor(date - setValue) >= time) return false;
    else return true;
} // Expire After end

static ownerOnly(command, message, isInt) {
    if (command.ownerOnly) {
    	let owner = process.env.dev || client?.config?.dev || config?.dev
    	if (!Array.isArray(owner)) owner = [owner]
        if (isInt) {
            if (owner.some(x => message.user.id == x)) return true
            else return false
        } else {
            if (owner.some(x => message.author.id == x)) return true
            else return false
        }
    } else return true
} // ownerOnly End

static async authorOnly(command, message) {
	if (!command.authorOnly) return true;
	await message.message.fetch()
	const channel = await message.guild.channels.fetch(message.message.reference.channelId)
	const msg = await channel.messages.fetch(message.message.reference.messageId)
	if (message.user.id == msg.author.id) return true;
	else return false;
	} //authorOnly End

    static userPermissions(command, message, isInt) {
        if (command.userPermissions && Array.isArray(command.userPermissions)) {
            if (isInt) {
                if (!message.guild) return;
                let user = message.member
                let perms = command.userPermissions
                let check = 0
                perms.forEach(i => {
                    if (user.permissions.has(i)) check++
                    else missingUserPermissions.push(`\n• ${i}`)
                })
                missingUserPermissions = []
                if (check === perms.length) return true;
                else return false;
            } else {
                if (!message.guild) return;
                let user = message.member
                let perms = command.userPermissions
                let check = 0
                perms.forEach(i => {
                    if (user.permissions.has(i)) check++
                    else missingUserPermissions.push(`\n• ${i}`)
                })
                missingUserPermissions = []
                if (check === perms.length) return true;
                else return false;
            }
        } else return true;
    } // user Permissions End


    static clientPermissions(command, message, isInt) {
        if (command.clientPermissions && Array.isArray(command.clientPermissions)) {
            if (isInt) {
                if (!message.guild) return;
                let user = message.guild.me
                let perms = command.clientPermissions
                let check = 0
                perms.forEach(i => {
                    if (user.permissions.has(i)) check++
                    else missingClientPermissions.push(`\n• ${i}`)
                })
                missingClientPermissions = []
                if (check === perms.length) return true
                else return false
            } else {
                if (!message.guild) return;
                let user = message.guild.me
                let perms = command.clientPermissions
                let check = 0
                perms.forEach(i => {
                    if (user.permissions.has(i)) check++
                    else missingClientPermissions.push(`\n• ${i}`)
                })
                missingClientPermissions = []
                if (check === perms.length) return true
                else return false
            }
        } else return true
    } // clientPermissions End


    static anyUserPermissions(command, message, isInt) {
        if (Array.isArray(command.anyUserPermissions)) {
            command.anyUserPermissions.forEach(x => missingAnyUserPermissions.push(`\n• ${x}`))
            missingAnyUserPermissions = []
            if (!message.guild) return;
            if (isInt) {
                let user = message.member
                let reqPerms = command.anyUserPermissions
                if (reqPerms.some(i => user.permissions.has(i))) return true;
                else return false;
            } else {
                let user = message.member
                let reqPerms = command.anyUserPermissions
                if (reqPerms.some(i => user.permissions.has(i))) return true;
                else return false;
            }
        } else return true;
    } // anyUserPermissions End


    static anyClientPermissions(command, message, isInt) {
        if (Array.isArray(command.anyClientPermissions)) {
            command.anyClientPermissions.forEach(x => missingAnyClientPermissions.push(`\n• ${x}`))
            missingAnyClientPermissions = []
            if (!message.guild) return;
            if (isInt) {
                let user = message.guild.me
                let reqPerms = command.anyClientPermissions
                if (reqPerms.some(i => user.permissions.has(i))) return true;
                else return false;
            } else {
                let user = message.guild.me
                let reqPerms = command.anyClientPermissions
                if (reqPerms.some(i => user.permissions.has(i))) return true;
                else return false;
            }
        } else return true;
    } // anyClientPermissions End


    static onlyUsers(command, message, isInt) {
        if (Array.isArray(command.onlyUsers)) {
            let allowed = command.onlyUsers
            let author = message.user
            allowed.forEach(user => missingUsers.push(`\n• <@${user}>`))
            missingUsers = []
            if (isInt) {
                if (allowed.some(i => i === author.id)) return true;
                else return false;
            } else {
                author = message.author
                if (allowed.some(i => i === author.id)) return true;
                else return false;
            }
        } else return true;
    } // onlyUsers End


    static onlyRoles(command, message, isInt) {
        if (Array.isArray(command.onlyRoles)) {
            let reqRoles = command.onlyRoles
            let author = message.member
            reqRoles.forEach(role => missingRoles.push(`\n• <@&${role}>`))
            missingRoles = []
            if (isInt) {
                if (reqRoles.some(i => author.roles.cache.has(i))) return true;
                else return false;
            } else {
                if (reqRoles.some(i => author.roles.cache.has(i))) return true;
                else return false;
            }
        } else return true;
    } // onlyRoles End


    static onlyChannels(command, message, isInt) {
        if (Array.isArray(command.onlyChannels)) {
            let allowed = command.onlyChannels
            let cnt = message.channelId
            allowed.forEach(channel => missingChannels.push(`\n• <#${channel}>`))
            missingChannels = []
            if (isInt) {
                if (allowed.some(i => i === cnt)) return true;
                else return false;
            } else {
                if (allowed.some(i => i === cnt)) return true;
                else return false;
            }
        } else return true;
    } // onlyChannels End


    static onlyGuilds(command, message, isInt) {
        if (Array.isArray(command.onlyGuilds) && message.guild) {
            let allowed = command.onlyGuilds
            let cnt = message.guild.id
            allowed.forEach(guild => missingGuilds.push(`\n• ${client.guilds.cache.get(guild).name}`))
            missingGuilds = []
            if (isInt) {
                if (allowed.some(i => i === cnt)) return true;
                else return false;
            } else {
                if (allowed.some(i => i === cnt)) return true;
                else return false;
            }
        } else return true;
    } // onlyGuilds End

} // class End

module.exports = {
    validator,
    missingUserPermissions,
    missingClientPermissions,
    missingAnyUserPermissions,
    missingAnyClientPermissions,
    missingUsers,
    missingRoles,
    missingChannels,
    missingGuilds
}