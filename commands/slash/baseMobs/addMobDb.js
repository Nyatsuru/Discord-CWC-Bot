const { EmbedBuilder } = require('discord.js');
const Mob = require('../../../schemas/baseMob');

module.exports = {
  name: "addmob", // Name of command
  description: "Add mob to databank", // Command description
  type: 1, // Command type
  options: [
    {
      name: "type",
      description: "write anything you want!",
      type: 3,
      required: true
    },
    {
      name: "name",
      description: "name mob",
      type: 3,
      required: true
    },
    {
      name: "health",
      description: "health mob",
      type: 4,
      required: true
    },
    {
      name: "description",
      description: "mob description",
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
    const mobHealth = interaction.options.get('health').value;
    const mobDesc = interaction.options.get('description').value;

    const newMob = new Mob();
    newMob.type = mobType;
    newMob.name = mobName;
    newMob.health = mobHealth;
    newMob.description = mobDesc;

    newMob.save().then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`${mobName} [${mobHealth} HP]`)
            .setAuthor({ name: mobType })
            .setDescription(mobDesc)
        ],
      })
    }).catch((error) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setTitle(`Could not create mob, it already exists (name: ${mobName}, type ${mobType})`)
            .setAuthor({ name: 'Error' })
            .setDescription(`Please use another name/type`)
        ],
      })
      console.log(error);
    });
  },
};