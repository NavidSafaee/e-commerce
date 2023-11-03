const EmailChecker = (userInput) => {
    const emailPattern = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/g
    return emailPattern.test(userInput)
}

const PhoneChecker = (userInput) => {
    const phonePattern = /^(0)9\d{9}$/g
    return phonePattern.test(userInput)
}

export {EmailChecker, PhoneChecker}
