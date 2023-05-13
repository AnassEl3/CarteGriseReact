export type JWTType = {
    sub: string,
    iat: number,
    exp: number,
}

export type AuthenticationForm = {
    cin: string,
    motDePasse: string,
    rememberMe: boolean
}