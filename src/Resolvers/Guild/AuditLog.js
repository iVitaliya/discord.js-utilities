const { Client, GuildAuditLogsEntry, GuildAuditLogsAction, Guild, Collection } = require('discord.js');
const { UserFetcher } = require('../..');

module.exports = class AuditLogFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [Role](https://discord.js.org/#/docs/main/stable/class/Role)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /**
     * Gets a {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} by the specified parameters, executor takes the user's mention, username, tag or ID (note that this property uses await so the function where this property is used must be async)
     * @public
     * @param {string} executor - The executor ({@link [User](https://discord.js.org/#/docs/main/stable/class/User)}) used to fetch the {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} by
     * @param {GuildAuditLogsAction} type - The type of the audit log to fetch
     * @param {Guild} guild - The guild to fetch the {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} from
     * @param {'first'|'last'} first_or_last - If it should get the first or the last entry
     * @returns Either a {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} or null
     */
    async get(
        executor,
        type,
        first_or_last,
        guild
    ) {
        const user = new UserFetcher(this.client).get(executor);
        const auditLog = await guild.fetchAuditLogs({
            type: type
        }).then((log) => log.entries
            .filter((entry) => entry.action === type && entry.executor.id === user.id)
        );

        const entry = await this[first_or_last](auditLog);
        return entry || null;
    }

    /**
     * Gets the first {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} by the specified parameters
     * @private
     * @param {Collection<string, GuildAuditLogsEntry>} entry - The entry to fetch for
     * @returns {Promise<GuildAuditLogsEntry>|null} Either a {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} or null
     */
    async first(
        entry
    ) {
        return entry.first() || null;
    }

    /**
     * Gets the last {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} by the specified parameters
     * @private
     * @param {Collection<string, GuildAuditLogsEntry>} entry - The entry to fetch for
     * @returns {Promise<GuildAuditLogsEntry>|null} Either a {@link [GuildAuditLogsEntry](https://discord.js.org/#/docs/main/stable/class/GuildAuditLogsEntry)} or null
     */
    async last(
        entry
    ) {
        return entry.last() || null;
    }
}