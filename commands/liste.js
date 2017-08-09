const Command = require('./command')

module.exports = class Liste extends Command {

    static match(message){
        return message.content.startsWith('lg!google')
    }


    static action(message){
        let args = message.content.split(' ')
        var role[]
        for (var i = 1; i < args.length; i++) {
            role[i-1] = args[i]
	    }
        return role
    }
}