import User from '../models/user';
const config = require("../twilio/config");
const { voiceToken } = require("../twilio/tokens");

export async function login(email, password) {
    const user = await User.findOne({ email, password }).exec();
    if (!user) {
        return {
            error: "User not found",
            result: null,
        };
    }

    return {
        result: {
            id: user.id,
            name: user.name,
            email: user.email,
        },
        error: "",
    }
}

export async function register(name, email, password) {
    const user = await User.findOne({ email }).exec();
    if (user) {
        return {
            result: null,
            error: "User already exists",
        }
    }
    
    const newUser = await User.create({name, email, password}); 
	if (newUser) {
        return {
            result: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
            },
            error: "",
        }
    }

    return {result: null, error: "Failed to register"}
}

export async function getToken (userId) {
    const user = await User.findById(userId).exec();
    if (user) {
        const token = voiceToken(userId, config);

        return {
            result: { token: token.toJwt() },
            error: "",
        }
    }

    return {result: null, error: "Failed to get token"}
}
