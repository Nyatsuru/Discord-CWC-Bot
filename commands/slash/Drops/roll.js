const Drop = require('../../../schemas/drop');
const { EmbedBuilder } = require('discord.js');
const Playerdrop = require('../../../schemas/playerdrop');
const RollService = require('../../../services/roll-service');
const ColorService = require('../../../services/color-service');

module.exports = {
  name: "roll", // Name of command
  description: "Roll for a drop",
  type: 1, // Command type
  options: [], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async function(client, interaction, config, db) {
    const drop = RollService.rollForDrop();

    const playerdrop = new Playerdrop();
    playerdrop.player = interaction.user.id;
    playerdrop.drop = drop;
    playerdrop.save().then(async _ => {
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
          embeds: [
            new EmbedBuilder()
              .setTitle(`You got ${drop.name}`)
              .setColor(ColorService.getColorForRarity(drop.rarity))
              .setAuthor({ name: drop.rarity })
              .setImage(drop.image),
          ],
        });
      }, 3700)
    }).catch((error) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Error Rolling`)
            .setAuthor({ name: 'Error' })
            .setDescription(error.message)
        ],
      });
    });
  },
};