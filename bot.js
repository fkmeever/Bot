/*
,_,
*/
const discord = require('discord.js');
const client = new discord.Client();
var prefix = `!`;
client.on('ready', () => {
    console.log(`Logged `);
    client.user.setActivity("Web-Station", { type: 'WATCHING' });
});
client.on('GuildMemberAdd', member => {
    if (!member.guild.id === "435410450549571585") return;
    if (member.author.bot) {
        member.ban()
    }
})
client.on('message', message => {
    if (message.content.startsWith("رابط")) {
        if (!message.channel.type === "text") return message.channel.sendMessage('ممنوع الأمر بالخاص');
        if (!message.channel.guild) return;

        message.channel.createInvite({
            thing: true,
            maxUses: 5,
            maxAge: 86400
        }).then(invite =>
            message.author.sendMessage(invite.url)
        )
        const embed = new discord.RichEmbed()
            .setColor("000000")
            .setDescription(`** فل خاص ${message.guild.name} تم ارسالك رابط سيرفر **`)
        message.channel.sendEmbed(embed).then(message => { message.delete(3000) })
        const EmbedMalek = new discord.RichEmbed()
            .setColor("000000")
            .setDescription(`**لخمس مستخدمين ${message.guild.name} هذا رابط سيرفر **`)
        message.author.sendEmbed(EmbedMalek)
    }
});
client.on('message', message => {


    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    let command = message.content.split(" ")[0];
    command = command.slice(prefix.length);
    let args = message.content.split(" ").slice(1);


    if (command === 'invites') {
        message.guild.fetchInvites().then(invs => {
            let member = client.guilds.get(message.guild.id).members.get(message.author.id);

            let personalInvites = invs.filter(i => i.inviter.id === message.author.id);
            let inviteCount = personalInvites.reduce((p, v) => v.uses + p, 0);
            message.reply(' تم دعوة  **' + inviteCount + '** شخص من قِبلك!\n');

        });
    }
    if (message.content.startsWith(prefix + 'clear')) {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('** You Don\'t Have `MANAGE_MESSAGES` Permission ??** ')
        message.channel.fetchMessages()
            .then(messages => {
                message.channel.bulkDelete(messages.array());
                message.channel.send('**messages deleted: **' + `\`${messages.array().length}\``).then(message => message.delete(1000));
            });
    }
});
client.login("NDI3NzQ0ODQ3NjY4MTgzMDQw.Db90IA.8Bmpw-PBIDaTt5blw6OSHbVXalg")

const client2 = new discord.Client();
client2.on('ready', () => {

    client2.user.setActivity("Web-Station", { type: 'WATCHING' });
});
client2.on("message", message => {
    if (message.content.split(' ')[0] == prefix + 'bc') {
        if (message.channel.type === 'dm') return
        if (message.author.bot) return;
        if (!message.channel.guild) return;
        message.reply(`** يرجى الإختار
       ${prefix}bc1 ${'`لإرسال رسالة لجميع أعضاء السيرفر `'}
    
       ${prefix}bc2 ${'`لإرسال رسالة لأعضاء السيرفر الـآون لاين فقط`'}**`)
    }
    if (message.content.split(' ')[0] == prefix + 'bc1') {
        if (message.author.id === client2.user.id) return
        if (!message.channel.guild) return
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('** You Don\'t Have `ADMINISTRATOR` Permission ??** ')
        let embed = new discord.RichEmbed()
        let args = message.content.split(' ').slice(1).join(' ');
        if (!args[0]) {
            message.channel.send(`**${prefix}bc Message**`);
            return;
        }
        const mo = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`**Are Your Sure ?**`, true)
            .addField('Try [yes/No] To Send Your Message'
                , `Your Message:
    ${args}`, true)
            .addField(`**Your Message Will Send To **`, `**${message.guild.memberCount} Member**`)
        message.channel.sendEmbed(mo).then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: 6000, maxMatches: 1, errors: ['time'] }).then(messages1 => {
                const reaction = messages1.first();
                if (reaction.content === 'yes') {
                    console.log("true/ yes")
                    message.guild.members.forEach(m => {
                        m.send(`**● السيرفر :
    » ${message.guild.name}
    ● المرسل :
    » ${message.author.username}**
    
    
    ${args}`)
                    })

                    const mo = new discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle(`**:ballot_box_with_check: Done , Your Brodcast Sendet To , ${message.guild.memberCount}  Member **`)
                        .addField('**Your Message:**', args)
                        .setColor('GRAY')
                    message.channel.sendEmbed(mo);
                } else { return }
            })
                .catch((err) => {
                    console.log(err)
                    message.channel.send('You did not enter any input!');
                });
        });
    }

    //bc Online & Dnd & idle
    if (message.content.split(' ')[0] == prefix + 'bc2') {
        if (message.channel.type === 'dm') return
        if (message.author.bot) return;
        if (message.author.id === client2.user.id) return
        if (!message.channel.guild) return
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply('** You Don\'t Have `ADMINISTRATOR` Permission ??** ')
        let embed = new discord.RichEmbed()
        let args = message.content.split(' ').slice(1).join(' ');
        if (!args[0]) {
            message.channel.send(`**${prefix}bc Message Will Send To Online & Dnd & idle**`);
            return;
        }
        const mo = new discord.RichEmbed()
            .setAuthor(message.author.username, message.author.avatarURL)
            .setTitle(`**Are Your Sure ?**`, true)
            .addField('\`Try [yes/No] To Send Your Message\`'
                , `Your Message:
    ${args}`, true)
        message.channel.sendEmbed(mo).then(() => {
            const filter = m => message.author.id === m.author.id;

            message.channel.awaitMessages(filter, { time: 6000, maxMatches: 1, errors: ['time'] }).then(messages1 => {
                const reaction = messages1.first();
                if (reaction.content === 'yes') {
                    console.log("true/ yes")
                    message.guild.members.filter(m => m.presence.status === 'dnd').forEach(m => {
                        m.send(`**● السيرفر :
    » ${message.guild.name}
    ● المرسل :
    » ${message.author.username}**
    
    
    ${args}`)
                    })

                    message.guild.members.filter(m => m.presence.status === 'online').forEach(m => {


                        m.send(`**● السيرفر :
    » ${message.guild.name}
    ● المرسل :
    » ${message.author.username}**
    
    
    ${args}`);
                    })
                    message.guild.members.filter(m => m.presence.status === 'idle').forEach(m => {


                        m.send(`**● السيرفر :
    » ${message.guild.name}
    ● المرسل :
    » ${message.author.username}**
    
    
    ${args}`);

                    });
                    const mo = new discord.RichEmbed()
                        .setAuthor(message.author.username, message.author.avatarURL)
                        .setTitle(`**:ballot_box_with_check: Done , Your Brodcast Sendet To , ${message.guild.memberCount}  Member **`)
                        .addField('**Your Message:**', args)
                        .setColor('GRAY')
                    message.channel.sendEmbed(mo);
                } else { return }
            })
                .catch((err) => {
                    console.log(err)
                    message.channel.send('You did not enter any input!');
                });
        });
    }
});



client2.login("NDI3NzQ0MjA3MzY5Nzk3NjMy.Db9z4g.gPrWnyMHjawAVUSd4P_i-IJyd3M")


const client3 = new discord.Client();

client3.on('ready', () => {

    client3.user.setActivity("Web-Station", { type: 'WATCHING' });
});


var dat = JSON.parse("{}");
function forEachObject(obj, func) {
    Object.keys(obj).forEach(function (key) { func(key, obj[key]) })
}
client3.on("ready", () => {
    var guild;
    while (!guild)
        guild = client3.guilds.find("name", "Web Station")
    guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            dat[Inv] = Invite.uses;
        })
    })
})
client3.on("guildMemberAdd", (member) => {
    let channel = member.guild.channels.find('name', 'العام');
    if (!channel) {
        console.log("!channel fails");
        return;
    }
    if (member.id == client3.user.id) {
        return;
    }
    console.log('made it till here!');
    var guild;
    while (!guild)
        guild = client3.guilds.find("name", "Web Station")
    guild.fetchInvites().then((data) => {
        data.forEach((Invite, key, map) => {
            var Inv = Invite.code;
            if (dat[Inv])
                if (dat[Inv] < Invite.uses) {
                    console.log(3);
                    console.log(`${member} joined over ${Invite.inviter}'s invite ${Invite.code}`)

                    channel.send(` Invited By: ${Invite.inviter} , Invite Code:  ${Invite.code}`)

                }


            dat[Inv] = Invite.uses;

        })


    })

});



const fs = require('fs');
var moment = require('moment');

client.on('guildMemberAdd', member => {



    if (member.guild.id === "435410450549571585") {
        var Canvas = require('canvas')
        var jimp = require('jimp')

        const w = ['./aa.png'];

        let Image = Canvas.Image,
            canvas = new Canvas(802, 404),
            ctx = canvas.getContext('2d');
        ctx.patternQuality = 'bilinear';
        ctx.filter = 'bilinear';
        ctx.antialias = 'subpixel';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
        ctx.shadowOffsetY = 2;
        ctx.shadowBlur = 2;
        fs.readFile(`${w[Math.floor(Math.random() * w.length)]}`, function (err, Background) {
            if (err) return console.log(err);
            let BG = Canvas.Image;
            let ground = new Image;
            ground.src = Background;
            ctx.drawImage(ground, 0, 0, 730, 300);

        })

        let url = member.user.displayAvatarURL.endsWith(".webp") ? member.user.displayAvatarURL.slice(5, -20) + ".png" : member.user.displayAvatarURL;
        jimp.read(url, (err, ava) => {
            if (err) return console.log(err);
            ava.getBuffer(jimp.MIME_PNG, (err, buf) => {
                if (err) return console.log(err);


                //wl
                ctx.font = '30px Arial Bold';
                ctx.fontSize = '30px';
                ctx.fillStyle = "#000000";
                ctx.textAlign = "center";
                ctx.fillText(member.user.username, 440, 160);

                //ur name
                ctx.font = '25px Arial';
                ctx.fontSize = '20px';
                ctx.fillStyle = "#FFFFFF";
                ctx.textAlign = "center";
                ctx.fillText("", 430, 210);

                //Avatar
                let Avatar = Canvas.Image;
                let ava = new Avatar;
                ava.src = buf;
                ctx.beginPath();
                ctx.arc(150, 152, 120, 0, Math.PI * 2, true);
                ctx.closePath();
                ctx.clip();

                ctx.drawImage(ava, 26, 26, 240, 255);

                ctx.closePath();



                client3.channels.get("435410451002818591").sendFile(canvas.toBuffer())




            })
        })

    }
});



client3.login("NDM3MTc4NjU5MzM4NzE1MTQ3.DbySdQ.FIRBA7By3BUWBve5d5dJRDDvC6A")
