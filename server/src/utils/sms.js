const https = require('https');


function sendSms(textId, phoneNumber, argument) {

    const data = JSON.stringify({
        'bodyId': textId,
        'to': phoneNumber,
        'args': [argument]
    });

    const options = {
        hostname: 'console.melipayamak.com',
        port: 443,
        path: '/api/send/shared/97fe278060a143828bc680dd9b1f4a95',
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


module.exports = sendSms;




