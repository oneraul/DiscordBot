const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    if (message.content === 'ping')
	{
    	message.reply('pong');
  	}
	else if (message.content === 'dado')
	{
		var min = 1;
		var max = 6;
		var roll = Math.floor(Math.random() * (max - min + 1)) + min;
		message.reply(roll);
	} 
	else if (message.content === 'nombre aleatorio')
	{
		message.reply('pene');
	}
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
