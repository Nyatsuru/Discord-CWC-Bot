const fs = require("fs");
const colors = require("colors");
const Migration = require("../schemas/migration");

module.exports = (client, config) => {
  (async () => {
    console.log('[HANDLER] Started migrations.'.yellow);

    try {
      const migrations = fs.readdirSync(`./migrations`).filter((file) => file.endsWith('.js'));

      if (migrations.length === 0) {
        console.log('[HANDLER] No migrations to execute.'.brightGreen);
        return;
      }

      for (let file of migrations) {
        const migrationName = file.replace('.js', '');
        if (await Migration.findOne({ name: migrationName }).exec() === null) {
          console.log(`[HANDLER] Running migration: ${migrationName}.`.blue);
          await require(`../migrations/${file}`).run();
          const newMigration = new Migration();
          newMigration.name = migrationName;
          await newMigration.save();
        }
      }

      console.log('[HANDLER] Successfully executed all migrations.'.brightGreen);
    } catch (err) {
      console.log(err);
    }
  })();
};
