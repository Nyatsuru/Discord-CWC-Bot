const { EmbedBuilder } = require('discord.js');
const Mob = require('../../../schemas/baseMob');

module.exports = {
  name: "show-basemob", // Name of command
  description: "Show value stored in data bank", // Command description
  type: 1, // Command type
  options: [
    {
      name: "name",
      description: "Show health of this mob",
      type: 3,
      required: true
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async (client, interaction, config, db) => {
    const mobName = interaction.options.get('name').value;
    let mobCurrent = await Mob.find({ name: mobName }).exec();
    mobCurrent = mobCurrent.pop();

    await interaction.reply({
      content: `${mobName} has ${mobCurrent.health} HP`
    });
  },
};