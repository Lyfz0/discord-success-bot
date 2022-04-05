const {
    Client,
    Intents,
    CommandInteraction
} = require('discord.js');

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]
});
bot.on('ready', () => {
    console.log(`Bot ${bot.user.tag} is logged in!`);
});
const fs = require('fs');

const { MessageEmbed } = require('discord.js');

bot.on("messageCreate", async message => {
    if (message.channel.id != 943189325150056448){
        return
    }
    if(message.author.bot) return;
    if (message.attachments.size > 0) {
        if (message.attachments.every(attachIsImage)){
            console.log(message.author.tag + ' sent image');
            const path = `./${message.author.username}.txt`;
            if (fs.existsSync(path)) {
                console.log("");
              } else {
                var file = fs.createWriteStream(`./${message.author.username}.txt`);
                file.once('open', function(fd) {
                    file.write("1");
                    file.end();
                });
                await sleep(3000);
              }
            let points = fs.readFileSync(`./${message.author.username}.txt`, 'utf-8');
            let pointss = parseInt(points) + 1; 
            const Helpembed = new MessageEmbed()
                .setColor('#ffffff')
                .setTitle('Success Bot')
                .setDescription(`1 point added, ${message.author.username} now has ${pointss} points`)
                .setTimestamp()
            message.channel.send({ embeds: [Helpembed] });
            fs.writeFileSync(`./${message.author.username}.txt`, String(pointss));
            pointss = 0;
            points = 0;
        }
    }  
    function attachIsImage(msgAttach) {
        var url = msgAttach.url;
        return url.indexOf("png", url.length - "png".length) !== -1;
    }
    
  })

bot.login('');