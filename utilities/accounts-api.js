import sendRequest from "./send-request";
// const BASE_URL = 'http://localhost:4741/accounts';
const BASE_URL = 'https://q-api.onrender.com/accounts';


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

export async function editMotto(motto) {
    return sendRequest(`${BASE_URL}/motto`, 'PUT', motto);
}

export async function updatePicture(pic) {
    return sendRequest(`${BASE_URL}/pic`, 'PUT', pic);
}

export async function addXp(xp) {
    return sendRequest(`${BASE_URL}/xp`, 'PUT', xp);
}

export async function submitAnswer(status) {
    console.log('my name is grizworld', status);
    return sendRequest(`${BASE_URL}/stats`, 'PUT', status);
}