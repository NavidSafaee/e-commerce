const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const { CronJob } = require('cron');
const ejs = require('ejs');

// const { sendBirthDaySms } = require('../utils/sms');
const nodemailer = require('nodemailer');

const User = require('../models/userModel');
const UserDiscount = require('../models/userDiscountModel');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: 'softlaand@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD
    }
});

// function scheduleTokenCleanup() {
//     new CronJob(
//         '0 4 * * 6',
//         cleanupExpiredTokens,
//         null,
//         true
//     );
// }


// async function cleanupExpiredTokens() {
//     try {
//         await User.updateMany({
//             'tokens.refreshTokenExpiration': { $lte: new Date() }
//         }, {
//             $pull: { tokens: { refreshTokenExpiration: { $lte: new Date() } } }
//         });
//     } catch (error) {
//         console.log(error);
//         console.log('an error occurred during the cleanUp operation');
//     }
// }

function scheduleUserDiscount() {
    new CronJob(
        '51 0 * * *',
        createUserDiscount,
        null,
        true
    );
}

async function createUserDiscount() {
    try {
        const todayDate = new Date();
        const month = todayDate.getMonth() + 1;
        const day = todayDate.getDate();

        const users = await User.find({
            $expr: {
                $and: [
                    { $eq: [{ $month: "$birthDate" }, month] },
                    { $eq: [{ $dayOfMonth: "$birthDate" }, day] }
                ]
            }
        });

        if (users.length === 0) return;

        const discountCode = await generateDiscountCode();
        const userDiscount = new UserDiscount({
            code: discountCode,
            percentage: 0.2,
            users
        });

        await userDiscount.save();
        await UserDiscount.deleteMany({ expiration: { $lte: new Date() } });

        for (const user of users) {
            if (!user.email) continue;

            const htmlFile = fs.readFileSync(path.join(__dirname, '..', 'views', 'birthday.ejs'));
            const renderedHtml = ejs.render(String(htmlFile), { username: user.username, discountCode });

            transporter.sendMail({
                from: 'softlaand@gmail.com',
                to: user.email,
                subject: 'verify your new Softland account',
                html: renderedHtml,
                attachments: [{
                    filename: 'pastel-green-logo.png',
                    path: path.join(__dirname, '..', '..', 'public', 'images', 'reset-password', 'pastel-green-logo.png'),
                    cid: 'logo'
                }]
            });
        }

    } catch (error) {
        console.log(error);
        console.log('an error occurred user discount creation');
    }
}


async function generateDiscountCode() {
    const randomInt = crypto.randomInt(100, 100000000).toString() + Date.now().toString();
    let hashedRandomInt = crypto.createHash('md5').update(randomInt).digest("hex");
    const discountCode = hashedRandomInt.slice(0, 5).toUpperCase();

    const userDiscount = await UserDiscount.findOne({ code: discountCode });

    if (userDiscount) return await generateDiscountCode();
    return discountCode;
}


// function scheduleExpiredDiscountCleanup() {
//     new CronJob(
//         '0 2 * * 6',
//         cleanupExpiredDiscountCodes,
//         null,
//         true
//     );
// }

// async function cleanupExpiredDiscountCodes() {
//     try {
//         await UserDiscount.deleteMany({ expiration: { $lte: new Date() } });
//     } catch (error) {
//         console.log(error);
//         console.log('an error occurred during the cleanUp operation');
//     }
// }


module.exports = {
    // scheduleTokenCleanup,
    scheduleUserDiscount,
    // scheduleExpiredDiscountCleanup
};