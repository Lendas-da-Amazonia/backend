export interface JWTUser {
    _id: string;
    username: string;
    email: string;
    iat?: number;
    exp?: number;
}
