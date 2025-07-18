require('dotenv').config();
const { Client, GatewayIntentBits, Events } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

// Scramble logic
function scrambleWord(word) {
  if (word.length <= 3) return word;
  const middle = word.slice(1, -1).split('');
  for (let i = middle.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [middle[i], middle[j]] = [middle[j], middle[i]];
  }
  return word[0] + middle.join('') + word[word.length - 1];
}

client.once(Events.ClientReady, () => {
  console.log(`🤖 Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'scram') {
    const input = interaction.options.getString('text');
    const scrambled = input
      .split(/\s+/)
      .map(scrambleWord)
      .join(' ');

    await interaction.reply(`🔀 Scrambled: ${scrambled}`);
  }
});
client.on('ready', async () => {
  const data = [
    {
      name: 'scram',
      description: 'Scramble the text you provide.',
      options: [
        {
          name: 'text',
          description: 'Text to scramble',
          type: 3, // STRING
          required: true,
        },
      ],
    },
  ];

  await client.application.commands.set(data); // re-register commands globally
  console.log('✅ Slash command registered!');
});


client.login(token);
