const { SlashCommandBuilder, REST, Routes } = require('discord.js');
const { token, clientId, guildId } = require('./config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('scram')
    .setDescription('Scramble the text!')
    .addStringOption(option =>
      option.setName('text')
        .setDescription('Enter text to scramble')
        .setRequired(true)
    )
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log('🚀 Deploying slash command...');
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands }
    );
    console.log('✅ Slash command deployed!');
  } catch (error) {
    console.error('❌ Error deploying command:', error);
  }
})();
