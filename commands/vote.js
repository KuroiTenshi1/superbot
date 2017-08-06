const Command = require('./command')

module.exports = class Vote extends Command {

    static match(message){
        return message.content.startsWith('lg!vote')
    }


    static action(message){
        let args = message.content.split(' ')
        args.shift()

        if((message.content==='lg!vote')||(message.content==='lg!vote ')){
            message.channel.send('Pour voter : lg!vote @accusé')
        }
        //recupperer le vote

        //ajouter à la liste
            // creer liste si non accusé
            // +1 si liste existant



        // revoyer l'accusation avec le nombre de votes sur lui
        //message.channel.send('nombres de votes contre ' + args.join(' ')+' : '+votes[id].nombres)
    }

}