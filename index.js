const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Timer = require('./commands/timer')
const Vote = require('./commands/vote')
var jour = 1
var players = [];
var names=[];
var roles=[];

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
    var textChannel = member.guild.channels.find('name', 'general')
    textChannel.send('Ho merde <@!'+member.id+'> est venue nous faire chier')
})

bot.on('guildMemberRemove', function(member){
    var textChannel = member.guild.channels.find('name', 'general')
    textChannel.send('Enfin débarassé de <@!'+member.id+'>')
})

bot.on('message', function (message){

    const Village = message.guild.channels.find('name', 'village')
    const Vote = message.guild.channels.find('name', 'vote')

    console.log(message.content)


    //Message écrit

    let commandUsed = Google.parse(message) || Timer.parse(message)
    if (message.content === 'lg!ping'){
        return message.channel.send('pong')
    }
    if (message.content === 'lg!out'){
        return Village.ifzhiofhzi()
    }
    if (message.content === 'lg!nuit'){
        return Village.send('La nuit tombe les <@&336273519749103617> s\'endorment')
    }
    if (message.content === 'lg!djayd'){
        Village.send('Coucou <@!257303430903627777>')
        return Village.send('lg!djayd')
    }
    if (message.content === 'lg!jour'){
        return Village.send('Le jour ce l\ève les <@&336273519749103617> se r\éveille')
    }
    if (message.content === 'lg!votez'){
        return Village.send('<@&336273519749103617> \r C\'est l\'heure des votes <#336607863235674112>:')
    }
    if(message.content === 'lg!clos'){
        Vote.send('<@&336273519749103617> \r C\'est la fin des votes fin du jour: '+jour)
        return jour=jour+1
    }
    if(message.content === 'lg!fin'){
        Village.send('<@&336273519749103617> \r C\'est la fin de la partie')
        return jour=1
    }
    
    
    //Pour sinscrire dans le loup-garou et creer un objet Joueur
    if(message.content === 'lg!register'){
        var id = message.member.id.toString() //Cette variable sert à identifier le joueur
        var registered = false //Cette variable sert à savoir si le joueur a deja ete identifie


        for (i=0; i<names.length;i++){ //recherche dans l'array names[] pour savoir si le joueur est deja inscrit dedans. Si oui, registered=true
            if (names[i]===id){
                var registered = true
            }
        }


         if (registered===false){ //si la personne n'a pas ete trouvée dans l'array name[], le bot cree un nouveau joueur
            players[id] = new player(message.member.displayName, "Villageois", true) //creation de l'objet joueur
            names.push(id) //rajoute l'id du joueur dans la liste des joueurs enregistrés
            message.channel.send('Le joueur '+ players[id].pseudo + ' est inscrit sous le role de ' + players[id].role)
         } else {
            message.channel.send('Le joueur '+ players[id].pseudo + ' est deja inscrit sous le role de ' + players[id].role) //dans le cas ou le joueur ete deja enregistre par le bot
         }
    }
    
    //Pour tester lobjet Joueur
    if(message.content === 'lg!me'){
        try{
            message.channel.send('Vous etes bien '+ players[message.member.id.toString()].pseudo + ' dont le role est ' + players[message.member.id.toString()].role)
        }catch(e){console.log(e)}
    }

    //Pour lancer la partie et distribuer les roles
    if(message.content === 'lg!start'){
        var number = names.length //determine le nombre de joueurs enregistrés

        //determine les roles à distribuer en fonction du nombre de joueurs
        if (number <= 6){
            roles=["loup-garou","voyante","salvateur","sorcière"]
        } else if (number > 6 & number <= 8){
            roles=["cupidon","enfant sauvage","voyante","salvateur","loup-garou","sorcière"]
        } else if (number > 8 && number <=11){
            roles=["cupidon","enfant sauvage","voyante","salvateur","loup-garou", "loup-garou","sorcière","chasseur"]
        } else {
            roles=["cupidon","enfant sauvage","voyante","salvateur","loup-garou", "loup-garou","sorcière","chasseur", "frere","frere","frere"]
        }

        var random_names=shuffleArray(names) //melange les joueurs avant de distribuer les roles

        for (i=0;i<random_names.length;i++){ //distribution des roles
            players[random_names[i]].role = roles[i]
        }

        message.channel.send('La partie vient de se lancer avec '+ number + ' joueurs')
    }


    
    //Gestion du serveur
    if (message.content === 'lg!membre'){ // compte le nombre de membre dans le serveur
        var number = message.guild.memberCount
        return message.channel.send('nombre de membres '+number)
    }
    if (message.content === 'lg!dispoguild'){ // verifie si guild existe
        var number = message.guild.available
        return message.channel.send('disp '+number)
    }
})



function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

bot.login('MzM3MjA3MDUwNzkyNzMwNjI0.DFD6zw.bOd4KWsriFrrAzS2rwIbXw3xRW4')
