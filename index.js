const Discord = require('discord.js')
const bot = new Discord.Client()
var jour = 1

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
    if (message.content === 'lg!ping'){
        message.channel.send('pong')
    }
    if (message.content === 'lg!nuit'){
        message.channel.send('La nuit tombe les \@Villageois s\'endorment')
    }
    if (message.content === 'lg!jour'){
        message.channel.send('La jour ce l\ève les \@Villageois se r\éveille')
    }
    if (message.content === 'lg!timer'){
        message.channel.send('\@Villageois \r Vous avez \"temps\" minutes pour d\ébattre #debat')
    }
    if (message.content === 'lg!vote'){
        message.channel.send('\@Villageois \r C\'est l\'heure des votes \#vote')
    }
    if(message.content === 'lg!clos'){
        message.channel.send('\@Villageois \r C\'est la fin des votes fin du jour: '+jour)
        jour=jour+1
    }
    if(message.content === 'lg!fin'){
        message.channel.send('\@Villageois \r C\'est la fin')
        jour=1
    }
    //Gestion du serveur
    // ne marche pas
    if (message.content === 'lg!membre'){
        var number = guild.memberCount
        message.channel.send('nombre de membre '+number)
    }
    if (message.content === 'lg!dispoguild'){
        var number = guild.available
        message.channel.send('disp '+number)
    }



})


bot.login('token')


