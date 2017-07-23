const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Timer = require('./commands/timer')
var jour = 1
var players = [];

//OBJECT CONSTRUCTOR - Player
function player(pseudo, role, alive) {
    this.pseudo = pseudo;
    this.role = role;
    this.alive = alive;
}

bot.on('ready', function(){
    //bot.user.setAvatar('./img/partial-solar-eclipse-clouds.jpg').catch(console.error)
    //bot.user.setUsername('Eclipse').catch(console.error)
    bot.user.setGame('En pr\éparation').catch(console.error)
})

bot.on('guildMemberAdd', function(member){
    member.createDM().then(function(channel){
        return channel.send('Bienvenue sur le serveur '+member.displayName)
    }).catch(console.error)
})


bot.on('message', function (message){

    //Message écrit

    if (Google.match(message)){
        return Google.action(message)
    }
    if (Timer.match(message)){
        return Timer.action(message)
    }
    if (message.content === 'lg!ping'){
        return message.channel.send('pong')
    }
    if (message.content === 'lg!nuit'){
        return message.channel.send('La nuit tombe les \@Villageois s\'endorment')
    }
    if (message.content === 'lg!jour'){
        return message.channel.send('La jour ce l\ève les \@Villageois se r\éveille')
    }
    if (message.content === 'lg!vote'){
        return message.channel.send('\@Villageois \r C\'est l\'heure des votes \#vote')
    }
    if(message.content === 'lg!clos'){
        message.channel.send('\@Villageois \r C\'est la fin des votes fin du jour: '+jour)
        return jour=jour+1
    }
    if(message.content === 'lg!fin'){
        message.channel.send('\@Villageois \r C\'est la fin')
        return jour=1
    }
    
    
    //Pour sinscrire dans le loup-garou et creer un objet Joueur
    if(message.content === 'lg!register'){
        players[message.member.displayName] = new player(message.member.displayName, "Villageois", true)
        message.channel.send('Le joueur '+ players[message.member.displayName].pseudo + ' est inscrit sous le role de ' + players[message.member.displayName].role)
    }
    
    //Pour tester lobjet Joueur
    if(message.content === 'lg!me'){
        message.channel.send('Vous etes bien '+ players[message.member.displayName].pseudo + ' dont le role est ' + players[message.member.displayName].role)
    }
    
    
    //Gestion du serveur
    // ne marche pas
    if (message.content === 'lg!membre'){
        var number = guild.memberCount
        return message.channel.send('nombre de membre '+number)
    }
    if (message.content === 'lg!dispoguild'){
        var number = guild.available
        return message.channel.send('disp '+number)
    }
})
bot.login('MzM3MjA3MDUwNzkyNzMwNjI0.DFD6zw.bOd4KWsriFrrAzS2rwIbXw3xRW4')