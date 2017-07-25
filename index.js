const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Timer = require('./commands/timer')
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
        message.channel.send('Vous etes bien '+ players[message.member.id.toString()].pseudo + ' dont le role est ' + players[message.member.id.toString()].role)
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
