const { EmbedBuilder } = require('discord.js');
const Mob = require('../../../schemas/activeMob');

module.exports = {
  name: "show-activemob", // Name of command
  description: "Use key to show panel of an mob", // Command description
  type: 1, // Command type
  options: [
    {
      name: "key",
      description: "key of the mob",
      type: 3,
      required: true
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async (client, interaction, config, db) => {
    const mobKey = interaction.options.get('key').value;
    let currentActiveMob = await Mob.find({ key: mobKey }).exec();
    currentActiveMob = currentActiveMob.pop();

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`${currentActiveMob.name} [${currentActiveMob.health} HP]`)
          .setAuthor({ name: `${currentActiveMob.type} | Lvl. ${currentActiveMob.level}` })
          .setDescription(currentActiveMob.description)
          .setFooter({ text: `${currentActiveMob.key}`, iconURL: 'https://www.pngmart.com/files/16/Vector-Silver-Key-Transparent-Background.png' })
      ],
    });
  },
};