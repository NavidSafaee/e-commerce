import { createContext } from "react"

const AuthContext = createContext({
    isLoggedIn: false,
    productsCountInCart: 0,
    accessToken: null,
    refreshToken: null,
    userInfo: null,
    login: () => { },
    logout: () => { },
    writeTokenInStorage: () => { },
    productsCountCalculator: () => { }
})

export default AuthContext