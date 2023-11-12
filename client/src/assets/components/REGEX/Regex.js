const EmailChecker = (userInput) => {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailPattern.test(userInput)
}

const PhoneChecker = (userInput) => {
    const phonePattern = /^(0)9\d{9}$/g
    return phonePattern.test(userInput)
}

export {EmailChecker, PhoneChecker}
