const {
    Client,
    StoreChannel,
    NewsChannel,
    CategoryChannel,
    TextChannel,
    VoiceChannel,
    Guild,
    GuildChannel
} = require('discord.js');
const { red, gray } = require('chalk');

/** @typedef {StoreChannel|NewsChannel|CategoryChannel|TextChannel|VoiceChannel} ChannelTypes */

module.exports = class ChannelFetcher {
    /**
     * @param {Client} client - The {@link [Discord Client](https://discord.js.org/#/docs/main/stable/class/Client)} used for fetching the {@link [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)}
     */
    constructor(client) {
        /** @private */
        this.client = client;
    }

    /**
     * Gets a {@link [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)} by the specified parameters, query takes a mention, name or ID
     * @public
     * @param {string} query - The query used to fetch the {@link [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)} by
     * @param {Guild} guild - The guild fetch the {@link [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)} from
     * @param {'store'|'news'|'category'|'text'|'voice'} [type] - The type of the {@link [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)} (used for filtered fetching)
     * @returns {GuildChannel|StoreChannel|NewsChannel|CategoryChannel|TextChannel|VoiceChannel|null} Either a {@link [Channel](https://discord.js.org/#/docs/main/stable/class/Channel)} or null
     */
    get(
        query,
        guild,
        type
    ) {
        if (type) {
            const channel = guild.channels.cache
                .filter((chan) => chan.type === type)
                .find(
                    (channel) => channel.id === query.replace(/[\\<>#]/g, '') ||
                        channel.name.toLowerCase() === query.toLowerCase()
                );

            return this._typer(channel, type) || null;
        } else {
            const channel = guild.channels.cache
                .find(
                    (channel) => channel.id === query.replace(/[\\<>#]/g, '') ||
                        channel.name.toLowerCase() === query.toLowerCase()
                );

            return channel;
        }
    }

    /** 
     * @private
     * @param {GuildChannel} channel
     * @param {'store'|'news'|'category'|'text'|'voice'} type
     * @returns {StoreChannel|NewsChannel|CategoryChannel|TextChannel|VoiceChannel|null}
     */
    _typer(channel, type) {
        switch (type) {
            case 'store':
                if (channel instanceof StoreChannel) return channel;
                else return null;

            case 'news':
                if (channel instanceof NewsChannel) return channel;
                else return null;

            case 'category':
                if (channel instanceof CategoryChannel) return channel;
                else return null;

            case 'text':
                if (channel instanceof TextChannel) return channel;
                else return null;

            case 'voice':
                if (channel instanceof VoiceChannel) return channel;
                else return null;
            
            default: 
                return null;
        }
    }
}