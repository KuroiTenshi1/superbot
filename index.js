const Discord = require('discord.js')
const guild = new  Discord.Guild()
const bot = new Discord.Client()


bot.on('ready', function(){
    bot.user.setAvatar('./img/partial-solar-eclipse-clouds.jpg').catch(console.error)
    bot.user.setGame('niquer des mères').catch(console.error)
    bot.user.setUsername('Eclipse').catch(console.error)
})


bot.on('message', function (message){
    if (message.content === 'lg!ping'){
        message.channel.send('pong')
    }
    // ne marche pas
    if (message.content === 'lg!membre'){
        var number = guild.memberCount
        message.channel.send('nombre de membre '+number)
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



})


bot.login('token')


