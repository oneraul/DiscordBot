const Discord = require('discord.js');
const client = new Discord.Client();
const insultos_db = require('insultos.json');

client.on('ready', () => {
    console.log('I am ready!');
});

function getRandomInclusive(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }

const GENEROS = [ "masculino", "femenino" ];
const CATEGORIAS_DE_SUSTANTIVO = [ "mutables", "inmutables" ];
const CATEGORIAS_DE_ADJETIVO = [ "variables", "invariables" ];

client.on('message', message => {
    if (message.content === 'ping')
	{
    	message.reply('pong');
  	}
	else if (message.content === 'dado')
	{
		message.reply(getRandomInclusive(1, 6));
	} 
	else if (message.content === 'insulto')
	{
		//message.channel.sendMessage(message.author.username + ' lololo', { code: true });
		
		var genero = GENEROS[getRandomInclusive(0, 1)];
		var categoria_de_sustantivo = CATEGORIAS_DE_SUSTANTIVO[getRandomInclusive(0, 1)];
		var categoria_de_adjetivo = CATEGORIAS_DE_ADJECTIVO[getRandomInclusive(0, 1)];
		
		var sustantivo;
		if (categoria_de_sustantivo === "mutables") {
			var list = insultos_db.sustantivos.mutables[genero];
			var i = getRandomInclusive(0, list.length-1);
			sustantivo = list[i] + (genero === "masculino" ? "o" : "a");
		}
		else {
			var list = insultos_db.sustantivos.inmutables;
			var i = getRandomInclusive(0, list.length-1);
			sustantivo = list[i];
		}
		
		var adjetivo;
		if (categoria_de_sustantivo === "variable") {
			var list = insultos_db.adjetivos.variables;
			var i = getRandomInclusive(0, list.length-1);
			adjetivo = list[i] + (genero === "masculino" ? "o" : "a");
		}
		else {
			var list = insultos_db.adjetivos.invariables;
			var i = getRandomInclusive(0, list.length-1);
			adjetivo = list[i];
		}
		
		var insulto = sustantivo + " " + adjetivo;
		message.channel.sendMessage(insulto, { code: true });
	}
});

bot.on('disconnect', function(msg, code) {
    if (code === 0) return console.error(msg);
    bot.connect();
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
