const {Client, Role, Guild} = require('discord.js');

module.exports = class RoleFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /**
     * Gets a {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} by the specified parameters, query takes a mention, ID, or name
     * @public
     * @param {string} query - The query used to fetch the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} by
     * @param {Guild} guild - The guild to fetch the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} from
     * @returns {Role|null} Either a {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} or null
     */
    get(
        query,
        guild
    ) {
        const role = guild.roles.cache.find(
            (role) => role.name.toLowerCase() === query.toLowerCase() ||
                role.id === query.replace(/[\\<>@&]/g, '')
        );

        if (!(role instanceof Role)) return null;
        else return role;
    }

    /**
     * Gets a {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} by the specified ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {Guild} guild - The {@link [Guild](https://discord.js.org/#/docs/main/stable/class/Guild)} to fetch the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} from
     * @param {string} ID - The ID to fetch the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} by
     * @param {boolean} cache - If it should search in the cache for the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)}
     * @param {boolean} force - If it should force to search for the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)}
     * @returns {Promise<Role>|null} Either the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)} or null
     */
     async fetch(
        guild,
        ID,
        cache,
        force
    ) {
        const role = await guild.roles.fetch(ID, cache, force);

        if (!(role instanceof Role)) return null;
        else return role;
    }
}