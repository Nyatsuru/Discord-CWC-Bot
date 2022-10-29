const Drop = require('../../../schemas/drop');
const CommandOption = require('../../../api/command-option');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

module.exports = {
  name: "adddrop", // Name of command
  description: "Add a drop to gatcha system",
  type: 1, // Command type
  options: [
    {
      name: "rarity",
      description: "write anything you want!",
      type: CommandOption.type.STRING,
      required: true
    },
    {
      name: "chance",
      description: "chance in percent",
      type: CommandOption.type.NUMBER,
      required: true
    },
    {
      name: "name",
      description: "name of drop",
      type: CommandOption.type.STRING,
      required: true
    },
    {
      name: "image",
      description: "image of the drop",
      type: CommandOption.type.ATTACHMENT,
      required: true
    },
    {
      name: "description",
      description: "drop description",
      type: CommandOption.type.STRING,
      required: true
    }
  ], // Command options
  permissions: {
    DEFAULT_PERMISSIONS: "", // Client permissions needed
    DEFAULT_MEMBER_PERMISSIONS: "" // User permissions needed
  },
  run: async (client, interaction, config, db) => {
    const rarity = interaction.options.get('rarity').value;
    const chance = interaction.options.get('chance').value;
    const name = interaction.options.get('name').value;
    const image = interaction.options.get('image').url;
    const description = interaction.options.get('description').value;

    const drop = new Drop();
    drop.rarity = rarity;
    drop.chance = chance;
    drop.name = name;
    drop.image = image;
    drop.description = description;

    drop.save().then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
              .setTitle(`${drop.name} [${drop.chance}%]`)
              .setAuthor({ name: drop.rarity })
              .setDescription(drop.description)
              .setImage(image)
        ],
      })
    }).catch((error) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
              .setTitle(`Could not create drop`)
              .setAuthor({ name: 'Error' })
              .setDescription(`${error.message}`)
        ],
      })
      console.log(error);
    });
  },
};