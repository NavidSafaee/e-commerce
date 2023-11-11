const { CronJob } = require('cron');

const User = require('../models/userModel');

function scheduleTokenCleanup() {
    new CronJob(
        '0 4 * * * 6',
        cleanupExpiredTokens,
        null,
        true
    );
}


async function cleanupExpiredTokens() {
    try {
        await User.updateMany({
            'tokens.refreshTokenExpiration': { $lte: new Date() }
        }, {
            $pull: { refreshTokens: { expirationDate: { $lte: new Date() } } }
        });
    } catch (error) {
        console.log(error);
        console.log('an error occurred during the cleanUp operation');
    }
}

module.exports = scheduleTokenCleanup;