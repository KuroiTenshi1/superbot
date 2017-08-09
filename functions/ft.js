module.exports = class ft{

static salon(message, room){
    return message.guild.channels.find('name', room)
}


}