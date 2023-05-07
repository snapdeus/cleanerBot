require('dotenv').config();
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { clientId, guildId, token } = require('./config/config.json');


const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});




const commandsPath = path.resolve(__dirname, './commands');
client.commands = new Collection();
const commandFiles = fs.readdirSync(`${ commandsPath }`).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`${ commandsPath }/${ file }`);
    // set a new item in the Collection
    // with the key as the command name and the value as the exported module
    client.commands.set(command.data.name, command);
}


client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${ interaction.commandName } was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
        } else {
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${ c.user.tag }`);
});

process.on("uncaughtException", (err, origin,) => {
    console.error(err, origin);
});

// Log in to Discord with your client's token
client.login(token);