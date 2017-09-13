const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Timer = require('./commands/timer')
const Vote = require('./commands/vote')
const Give = require('./commands/give')
const Liste = require('./commands/liste')
const funct = require('./functions/ft')
const roles = require('./objects/role')
const tok = require('./objects/token')


const ft = require('./functions/ft')
var jour = 1
var players = [];
var names=[];
var listes=[];
var token = tok.getToken();

//OBJECT CONSTRUCTOR - Player
function player(user, pseudo, role, alive) {
    this.user= user;
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

    //const Village = message.guild.channels.find('name', 'village')
    //const Vote = message.guild.channels.find('name', 'vote')
    const sender        = message.member
	  const senderId      = sender.id
    const senderRoles    = sender.roles

    // fonction qui recupere le salon par son nom
    function salon(room){
        return message.guild.channels.find('name', room)
    }

    console.log(message.content)


    //Message écrit

    let commandUsed = Google.parse(message) || Timer.parse(message)

    // Commandes narrateur
    if(senderRoles.find("name","Narrateur")!= null){
        //lister les roles demandé
      	if(message.content.startsWith('lg!liste')){
            let args = message.content.split(' ');
            for (var i = 1; i < args.length; i++) {
                listes.push(args[i]);
                console.log(listes[i-1]);
          	}
        }
      	//Lister les cartes demandé
        if(message.content === 'lg!lister'){
        	for (var i = 0; i < listes.length; i++) {
              message.channel.send(listes[i])
          }
        }

        //Pour lancer la partie et distribuer les roles
        if(message.content === 'lg!start'){
            var number = names.length //determine le nombre de joueurs enregistrés

            //determine les roles à distribuer en fonction du nombre de joueurs
            if (number <= 6){
                cartes=["loup","voyante","salvateur","sorciere"]
            } else if (number > 6 & number <= 8){
                cartes=["cupidon","enfant sauvage","voyante","salvateur","loup","sorciere"]
            } else if (number > 8 && number <=11){
                cartes=["cupidon","enfant sauvage","voyante","salvateur","loup", "loup-garou","sorciere","chasseur"]
            } else {
                cartes=["cupidon","enfant sauvage","voyante","salvateur","loup", "loup-garou","sorciere","chasseur", "frere","frere","frere"]
            }

            var random_names=shuffleArray(names) //melange les joueurs avant de distribuer les roles

            for (i=0;i<random_names.length;i++){ //distribution des roles
                players[random_names[i]].role = cartes[i]
                players[random_names[i]].user.addRole(roles.giveRole([cartes[i]]))
            }

            message.channel.send('La partie vient de se lancer avec '+ number + ' joueurs')
        }
        if (message.content === 'lg!nuit'){
            return salon('village').send('La nuit tombe les <@&336273519749103617> s\'endorment')
        }
        if (message.content === 'lg!jour'){
            return salon('village').send('Le jour ce l\ève les <@&336273519749103617> se r\éveille')
        }
        if (message.content === 'lg!votez'){
            return salon('village').send('<@&336273519749103617> \r C\'est l\'heure des votes <#336607863235674112>:')
        }
        if(message.content === 'lg!clos'){
            Vote.send('<@&336273519749103617> \r C\'est la fin des votes fin du jour: '+jour)
            return jour=jour+1
        }
        if(message.content === 'lg!fin'){
            salon('village').send('<@&336273519749103617> \r C\'est la fin de la partie')
            return jour=1
        }
    }

    if (message.content === 'lg!djayd'){
        salon('village').send('Coucou <@!257303430903627777>')
        return salon('village').send('lg!djayd')
    }
    if(message.content === 'lg!join'){
				var role = message.guild.roles.find('name', 'Villageois').id
   	    message.member.addRole(role)
   	    return salon('village').send('<@'+senderId+'> a rejoint la partie.')
    }
    if(message.content === 'lg!test'){
   	    return console.log(senderRoles.find("name","Narrateur"))
    }
    if (message.content === 'lg!ping'){
        return message.channel.send('pong')
    }
    if (message.content === 'lg!out'){
        return salon('village').ifzhiofhzi()
    }


    if(message.content === 'lg!role'){
      var nom_du_role = "loup"
      var msg = "<@&"+ roles.giveRole([nom_du_role])+">"
      message.channel.send(msg)
    }

    //Pour sinscrire dans le loup-garou et creer un objet Joueur
    if(message.content === 'lg!register'){
        var id = message.member.id.toString() //Cette variable sert à identifier le joueur
        var user = message.member
        var registered = false //Cette variable sert à savoir si le joueur a deja ete identifie


        for (i=0; i<names.length;i++){ //recherche dans l'array names[] pour savoir si le joueur est deja inscrit dedans. Si oui, registered=true
            if (names[i]===id){
                var registered = true
            }
        }


         if (registered===false){ //si la personne n'a pas ete trouvée dans l'array name[], le bot cree un nouveau joueur
            players[id] = new player(user,message.member.displayName, "Villageois", true) //creation de l'objet joueur
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

bot.login(token)
