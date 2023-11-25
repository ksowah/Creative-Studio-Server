export interface User {
    _id: String
    fullName: String
    email: String
    avatar: String
    password: String
    authType: String
    userType: String
    username: String
    available: Boolean
    followers: Number
    following: Number
}

export interface MainUser {
    id: String
    fullName: String
    email: String
    avatar: String
    username: String
    followers: Number
    following: Number
}