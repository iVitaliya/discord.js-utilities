const { Client, Guild, User, Collection } = require('discord.js');
const { UserFetcher } = require('../..');

module.exports = class BanFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [Ban](https://discord.js.org/#/docs/main/stable/class/Ban)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /**
     * Gets the {@link [BanInfo](https://discord.js.org/#/docs/main/stable/typedef/BanInfo)} by the specified parameters, query takes the user's mention, username, tag or ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {string} query - The query used to fetch the {@link [User](https://discord.js.org/#/docs/main/stable/class/User)}'s {@link [BanInfo](https://discord.js.org/#/docs/main/stable/typedef/BanInfo)} by (note that this is used to fetch the user)
     * @param {Guild} guild - The guild to fetch the {@link [BanInfo](https://discord.js.org/#/docs/main/stable/typedef/BanInfo)} from
     * @param {'first'|'last'} first_or_last - If it should get the first or the last entry
     * @returns {Promise<{ user: User; reason: string; }>} Either the {@link [BanInfo](https://discord.js.org/#/docs/main/stable/typedef/BanInfo)} or null
     */
    async get(
        query,
        first_or_last,
        guild
    ) {
        const user = new UserFetcher(this.client).get(query);
        const ban = await guild.fetchBans().then((ban) => ban.filter((entry) => entry.user.id === user.id));

        const entry = await this[first_or_last](ban);
        return entry || null;
    }

    /**
     * Gets the first {@link [BanInfo](https://discord.js.org/#/docs/main/stable/typedef/BanInfo)} by the specified parameters
     * @private
     * @param {Collection<string, { user: User; reason: string; }>} entry - The entry to fetch for
     * @returns {Promise<{ user: User; reason: string; }>|null} Either a {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} or null
     */
    async first(
        entry
    ) {
        return entry.first() || null;
    }

    /**
     * Gets the last {@link [BanInfo](https://discord.js.org/#/docs/main/stable/typedef/BanInfo)} by the specified parameters
     * @private
     * @param {Collection<string, { user: User; reason: string; }>} entry - The entry to fetch for
     * @returns {Promise<{ user: User; reason: string; }>|null} Either a {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} or null
     */
    async last(
        entry
    ) {
        return entry.last() || null;
    }
}