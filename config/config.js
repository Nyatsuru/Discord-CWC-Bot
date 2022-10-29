const secretToken = process.env['TOKEN']
const secretMongo = process.env['MONGO']

module.exports = {

  Prefix: "?", // YOUR BOT PREFIX.

  Users: {
    OWNERS: ["239385094689783809"] // THE BOT OWNERS ID.
  },

  Handlers: {
    MONGO: secretMongo // YOUR MONGO URI. (USE THIS ONLY IN VSCODE)
  },

  Client: {
    TOKEN: secretToken, // YOUR BOT TOKEN. (USE THIS ONLY IN VSCODE)
    ID: "1031684036474712184" // YOUR BOT ID.
  }

}

