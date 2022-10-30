const Drop = require('../../../schemas/drop');
const { EmbedBuilder } = require('discord.js');
const Playerdrop = require('../../../schemas/playerdrop');
const RollService = require('../../../services/roll-service');
const ColorService = require('../../../services/color-service');

module.exports = {
  name: "roll10", // Name of command
  description: "Roll for a drop",
  type: 1, // Command type
  options: [], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  generateEmbeds: function (drops) {
    const embeds = [];

    drops.forEach(drop => {
      embeds.append(
          new EmbedBuilder()
          .setTitle(`You got ${drop.name}`)
          .setColor(ColorService.getColorForRarity(drop.rarity))
          .setAuthor({ name: drop.rarity })
          .setThumbnail(drop.image)
      );
    })

    return embeds;
  },
  run: async function(client, interaction, config, db) {
    const drops = [];
    for (let index = 0; index < 10; index++) {
      drops.append(RollService.rollForDrop());
    }

    for (const drop of drops) {
      const playerdrop = new Playerdrop();
      playerdrop.player = interaction.user.id;
      playerdrop.drop = drop;
      await playerdrop.save();
    }

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Rolling`)
          .setAuthor({ name: 'rolling' })
      ],
    });

    await interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Rolling`)
          .setAuthor({ name: 'rolling' })
          .setImage('https://cdn.discordapp.com/attachments/1033218973896028300/1036062877448163398/drop-animation-square.gif'),
      ],
    });

    setTimeout(_ => {
      interaction.editReply({
        embeds: this.generateEmbeds(drops),
      });
    }, 3700)
  },
};