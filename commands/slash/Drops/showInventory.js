const { EmbedBuilder } = require('discord.js');
const Playerdrop = require('../../../schemas/playerdrop');

module.exports = {
  name: "showInventory", // Name of command
  description: "shows your drops",
  type: 1, // Command type
  options: [], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async function(client, interaction, config, db) {
    const playerdrops = await Playerdrop.find({ player: interaction.player.id }).exec();

    playerdrops.forEach(playerdrop => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
              .setTitle(playerdrop.drop.name)
              .setAuthor({ name: playerdrop.drop.rarity })
              .setImage(playerdrop.drop.image)
        ],
      });
    })
  },
};