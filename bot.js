const Discord = require("discord.js");
const client = new Discord.Client();

function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
    
var prefix = "-";

client.on("ready", () => {
  console.log("${client.user.tag} | Logged in! User count: ${client.users.size}");
  console.log('----------------------');
  console.log('Prefix: ' + prefix);
  console.log('ID: ' + client.user.id);
  console.log('----------------------');
  console.log('Channels: ' + client.channels.size);
  console.log('Users: ' + client.users.size);
  console.log('----------------------');
  console.log('https://discordapp.com/oauth2/authorize?client_id=' + client.user.id + '&scope=bot&permissions=8');
  console.log('----------------------');
  client.user.setPresence({game: {name: `over ${client.users.size} people | ?help`, type: 3}});
});

client.on("message", (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  if (message.content.toLowerCase().startsWith(prefix + `help`)) {
    const embed = new Discord.RichEmbed()
    .setTitle(`:mailbox_with_mail: ProximDesigns Bot Help`)
    .setColor(0xCF40FA)
    .setDescription(`Hello! I'm the official ProximDesigns Discord bot. I handle tickets, moderation and much more! Here are my commands:`)
    .addField(`Tickets`, `[${prefix}new]() > Opens up a new ticket and tags • The Team\n[${prefix}close]() > Closes a ticket that has been resolved or been opened by accident`)
    .addField(`Other`, `[${prefix}help]() > Shows you this help menu that you are reading\n[${prefix}ping]() > Pings the bot to see how long it takes to respond\n[${prefix}about]() > Tells you all about ProximDesigns`)
    message.channel.send({ embed: embed });
}

if (message.content.toLowerCase().startsWith(prefix + `new`)) {
if (message.content.toLowerCase().startsWith(prefix + `open`)) {
if (message.content.toLowerCase().startsWith(prefix + `ticket new`)) {
if (message.content.toLowerCase().startsWith(prefix + `ticket open`)) {
    const reason = message.content.split(" ").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "• The Team")) return message.channel.send(`The server doesn't have a \`• The Team\` role made, so the ticket won't be opened.\nIf you are an administrator, make one with that name exactly and give it to users that should be able to see tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`You already have a ticket open.`);
    message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
        let role = message.guild.roles.find("name", "• The Team");
        let role2 = message.guild.roles.find("name", "@everyone");
        c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.react('✅');
        message.channel.send(`:white_check_mark: Your ticket has been created, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(0xCF40FA)
        .addField(`Hi there, ${message.author.username}!`, `Please try explain why you opened this ticket with as much detail as possible. <@&438379863955472412> will be here soon to help.`)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}
    
if (message.content.toLowerCase().startsWith(prefix + `close`)) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`You can't use the close command outside of a ticket channel.`);

    message.channel.send(`Are you sure? Once confirmed, you cannot reverse this action!\nTo confirm, type \`-confirm\`. This will time out in 10 seconds and be cancelled.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close timed out, the ticket was not closed.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
    
}

});
    
client.login(process.env.BOT_TOKEN);

