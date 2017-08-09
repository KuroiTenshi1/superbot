const Discord = require('discord.js')
const bot = new Discord.Client()
const Google = require('./commands/google')
const Timer = require('./commands/timer')
const Vote = require('./commands/vote')
const Role = require('./commands/role')

const ft = require('./functions/ft')
var jour = 1
var players = [];
var names=[];
var roles={
  "loup" : "336910690361016330",
  "voyante" : "336910820539760650",
  "sorciere" :"336910769742544899",
  "cupidon" :"336965266342805504",
  "petite fille" :"336910803745636353",
  "chasseur" :"336910847005818881",
  "voleur" :"336910861123977218",
  "salvateur" :"336910791167180801",
  "idiot du village" :"336910875824750593",
  "bouc emissaire" :"336910894426750978",
  "ancien" :"336910912479035393",
  "joueur de flute" :"336953910482829312",
  "corbeau" :"336953930900832256",
  "loup blanc" :"336954044470001681",
  "ange" :"336954149595774978",
  "alchimiste" :"336954211113893888",
  "moine" :"336954260430389248",
  "arnacoeur" :"336954305519288333",
  "avocat" :"336954350004076545",
  "berger" :"336954393482231810",
  "chaman" :"336954428294955011",
  "chien" :"336960830174265357",
  "enfant sauvage" :"336954548822474753",
  "renard" :"336954670348238848",
  "servante dévouée" :"336954697166356490",
  "frere" :"336954769077829632",
  "soeur" :"336954804003667969"
};

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
	const sender = message.member.id

// fonction qui recupere le salon par son nom
function salon(room){
    return message.guild.channels.find('name', room)
}

    console.log(message.content)


    //Message écrit

    let commandUsed = Role.parse(message) || Timer.parse(message)
    if(message.content === 'lg!join'){
		var role = message.guild.roles.find('name', 'Villageois').id
   	    message.member.addRole(role)
   	    return Village.send('<@'+sender+'> a rejoint la partie.')
    }
    if (message.content === 'lg!ping'){
        return message.channel.send('pong')
    }
    if (message.content === 'lg!out'){
        return salon('Village').ifzhiofhzi()
    }
    if (message.content === 'lg!nuit'){
        return salon('village').send('La nuit tombe les <@&336273519749103617> s\'endorment')
    }
    if (message.content === 'lg!djayd'){
        Village.send('Coucou <@!257303430903627777>')
        return salon('Village').send('lg!djayd')
    }
    if (message.content === 'lg!jour'){
        return salon('Village').send('Le jour ce l\ève les <@&336273519749103617> se r\éveille')
    }
    if (message.content === 'lg!votez'){
        return salon('Village').send('<@&336273519749103617> \r C\'est l\'heure des votes <#336607863235674112>:')
    }
    if(message.content === 'lg!clos'){
        Vote.send('<@&336273519749103617> \r C\'est la fin des votes fin du jour: '+jour)
        return jour=jour+1
    }
    if(message.content === 'lg!fin'){
        salon('Village').send('<@&336273519749103617> \r C\'est la fin de la partie')
        return jour=1
    }

    if(message.content === 'lg!role'){
      var nom_du_role = "loup"
      var msg = "<@&"+ roles[nom_du_role]+">"
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
            players[random_names[i]].user.addRole(roles[cartes[i]])
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
