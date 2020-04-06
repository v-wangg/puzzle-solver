const processMessage = require('../helpers/processMessage');
module.exports = (req, res) => {
    if (req.body.object === 'page') {
        req.body.entry.forEach(entry => {
            entry.messaging.forEach(event => {
                senderPSID = event.sender.id
                if (event.message && event.message.text) {
                    console.log(event);
                    processMessage(event);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.status(404);
    }
};