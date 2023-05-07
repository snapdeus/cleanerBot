const { REST, Routes } = require('discord.js');

const fs = require('fs');
const path = require('path');

const { clientId, guildId, token } = require('./config/config.json');


const commands = [];
const commandsPath = path.join(__dirname, './commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    commands.push(command.data.toJSON());
}



const rest = new REST().setToken(token);

(async () => {
    try {
        console.log(`Started refreshing ${ commands.length } application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(clientId, guildId),
            { body: commands },
        );

        console.log(`Successfully reloaded ${ data.length } application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
})();