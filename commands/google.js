const Command = require('./command')

module.exports = class Google extends Command {

    static match(message){
        return message.content.startsWith('lg!google')
    }


    static action(message){
        let args = message.content.split(' ')
        args.shift()
        message.reply('https://www.google.fr/search?q=' + args.join('%20'))
    }

}
