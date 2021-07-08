const { UserFetcher } = require('../src/index');
const { Client } = require('discord.js');

const client = new Client();

new UserFetcher(client).get('id', 'dhdhdfdhfdfh');