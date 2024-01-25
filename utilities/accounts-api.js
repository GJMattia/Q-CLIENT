import sendRequest from "./send-request";
const BASE_URL = 'http://localhost:4741/accounts';
// const BASE_URL = 'https://q-api.onrender.com/accounts';


export async function createAccount(userID) {
    try {
        await sendRequest(BASE_URL, 'POST', userID);
    } catch (error) {
        console.error('Error creating question:', error);
    };
};

export async function getAccount() {
    return sendRequest(BASE_URL);
};