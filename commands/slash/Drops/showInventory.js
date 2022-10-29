const { EmbedBuilder } = require('discord.js');
const Playerdrop = require('../../../schemas/playerdrop');

module.exports = {
  name: "showinventory", // Name of command
  description: "shows your drops",
  type: 1, // Command type
  options: [], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async function(client, interaction, config, db) {
    const playerdrops = await Playerdrop.find({ player: interaction.user.id }).populate('drop').exec();
    const sortedPlayerdrops = {
      unique: playerdrops.filter(playerdrop => playerdrop.drop.rarity === 'unique'),
      legendary: playerdrops.filter(playerdrop => playerdrop.drop.rarity === 'legendary'),
      epic: playerdrops.filter(playerdrop => playerdrop.drop.rarity === 'epic'),
      rare: playerdrops.filter(playerdrop => playerdrop.drop.rarity === 'rare'),
      uncommon: playerdrops.filter(playerdrop => playerdrop.drop.rarity === 'uncommon'),
      common: playerdrops.filter(playerdrop => playerdrop.drop.rarity === 'common'),
    }

    let description = '';
    for (const rarity in sortedPlayerdrops) {
      description += `\n\n ${rarity}:`

      sortedPlayerdrops[rarity].forEach(playerdrop => {
        description += `\n ${playerdrop.drop.name}`
      })
    }

    interaction.reply({
      embeds: [
        new EmbedBuilder()
            .setTitle('Inventory')
            .setDescription(description)
      ],
    });
  },
};