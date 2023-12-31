export interface JWTUser {
    _id: string;
    username: string;
    email: string;
    role: string;
    iat?: number;
    exp?: number;
}
