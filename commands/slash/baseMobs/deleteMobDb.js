const { EmbedBuilder } = require('discord.js');
const Mob = require('../../../schemas/baseMob');

module.exports = {
  name: "deletemob", // Name of command
  description: "Deletes selected mob", // Command description
  type: 1, // Command type
  options: [
    {
      name: "type",
      description: "Type of the mob",
      type: 3,
      required: true
    },
    {
      name: "name",
      description: "Name of the mob",
      type: 3,
      required: true
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async (client, interaction, config, db) => {
    const mobType = interaction.options.get('type').value;
    const mobName = interaction.options.get('name').value;
    await Mob.deleteOne({ name: mobName, type: mobType }).exec().catch(() => {
      interaction.reply({
        content: `FEHLER`
      });
    }).then(() => {
      interaction.reply({
        content: `${mobType} ${mobName} has been deleted`
      });
    });
  },
};