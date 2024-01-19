const https = require('https');


function sendOTPSms(textId, phoneNumber, OTP) {

    const data = JSON.stringify({
        'bodyId': textId,
        'to': phoneNumber,
        'args': [OTP]
    });

    const options = {
        hostname: 'console.melipayamak.com',
        port: 443,
        path: process.env.SMS_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, res => {
        console.log('statusCode: ' + res.statusCode);

        res.on('data', d => {
            process.stdout.write(d)
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}


function sendBirthDaySms(textId, phoneNumber, username, discountPercentage) {

    const data = JSON.stringify({
        'bodyId': textId,
        'to': phoneNumber,
        'args': [username, discountPercentage]
    });

    const options = {
        hostname: 'console.melipayamak.com',
        port: 443,
        path: process.env.SMS_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    const req = https.request(options, res => {
        console.log('statusCode: ' + res.statusCode);

        res.on('data', d => {
            process.stdout.write(d)
        });
    });

    req.on('error', error => {
        console.error(error);
    });

    req.write(data);
    req.end();
}


module.exports = {
    sendOTPSms,
    sendBirthDaySms
};




