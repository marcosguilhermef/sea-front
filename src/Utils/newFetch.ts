import getToken from "./getToken";
export async function newFetch(url: string, method: string, body?: object){
    const token  = getToken()
    let urln = process.env.API_URL !== undefined ? process.env.API_URL : ''

    let rq = await fetch(urln+url, {
        body: body !== undefined ? JSON.stringify(body) : undefined,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        },

    });

    return rq
}