const Command = require('./command')

var roles={
  "loup" : "336910690361016330",
  "voyante" : "336910820539760650",
  "sorciere" :"336910769742544899",
  "cupidon" :"336965266342805504",
  "Petite fille" :"336910803745636353",
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

module.exports = class Give extends Command {

    static match(message){
        return message.content.startsWith('lg!give')
    }


    static action(message){
        let args = message.content.split(' ')
      	var nom_du_role = args[1]
        var player = args[2]
        var n = player.length;
        var playerId = player.substring(2, n-1);
   	    message.guild.members.find('id', playerId).addRole(roles[nom_du_role])
        return message.guild.channels.find('name', 'bot').send(args[2]+' a rejoint la partie.')
    }

}