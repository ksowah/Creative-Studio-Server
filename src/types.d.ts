export interface User {
    _id: String
    fullName: String
    email: String
    avatar: String
    password: String
    authType: String
    userType: String
    available: Boolean
    subscription: String
    verified: Boolean
    bio: String
    username: String
    specialization: String
    phoneNumber: String
    website: String
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