const { SlashCommandBuilder } = require('discord.js');




async function sleep(interval) {
    return new Promise((resolve) => setTimeout(resolve, interval));
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('bulkdelete')
        .setDescription('bulkdeletes')
        .addNumberOption(option =>
            option.setName('amount')
                .setDescription('Amount of messages to delete')
                .setMaxValue(100)

        ),
    async execute(interaction) {
        let amount = interaction.options.getNumber("amount") || 1;


        let deletedCount = 0;
        await interaction.channel.messages.fetch({ limit: 100 }).then(async (msgCollection) => {
            await interaction.deferReply();
            for (const msg of msgCollection.values()) {
                if (deletedCount >= amount) break;
                if (msg.author.id == interaction.user.id) {
                    await msg.delete();
                    deletedCount++;
                    await sleep(600);
                }
            }
        });
        await interaction.editReply({ content: `${ amount || 1 } of your messages deleted.` });
    }
};