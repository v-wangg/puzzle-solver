const API_AI_TOKEN = "99ad2f87a92f4f84809558733392db9f";

const apiAiClient = require('apiai')(API_AI_TOKEN);

const FACEBOOK_ACCESS_TOKEN = "EAANPOuG3CegBALE5Do0pRdP4SUQUjzVgn3rJtSZA9KsXpmsdQbGAydRXghV6fZArW4GKD42dfIbLyc21dNYMwJ5uEZC7T2pPKSMmyHSAYx57VpkTV96S4W4ESTKCn4eIGhSZBVTLjX4HyVWVkI1vesISfOT7Tqr5TuEY2XcQ2wZDZD";

const request = require('request');

const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v3.2/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: { text },
        }
    });
};

module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'jiggie'});
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};