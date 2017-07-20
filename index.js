const Discord = require('discord.js')
const bot = new Discord.Client()
const guild =
bot.on('message', function (message){
    if (message.content === 'lg!ping'){
        message.channel.send('pong')
    }
    /*
    if (message.content === '%membre'){
        var number = guild.memberCount
        message.channel.send('nombre de membre '+Discord.guild)
    }
    */
    if (message.content === 'lg!nuit'){
        message.channel.send('La nuit tombe les @everyone s\'endorment')
    }

    if (message.content === 'lg!timer'){
        message.channel.send('Vous avec \"temps\" minutes pour d\êbatre')
    }


})


bot.login('token')


