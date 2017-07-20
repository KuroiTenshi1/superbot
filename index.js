const Discord = require('discord.js')
const bot = new Discord.Client()

bot.on('message', function (message){
    if (message.content === '%ping'){
        message.channel.send('pong')
    }
    /*
    if (message.content === '%membre'){
        var number = guild.memberCount
        message.channel.send('nombre de membre '+Discord.guild)
    }
    */
})


bot.login('token')


