import getToken from "./getToken";
export async function newFetch(url: string, method: string, body?: object){
    const token  = getToken()

    let rq = await fetch(url, {
        body: body !== undefined ? JSON.stringify(body) : undefined,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        },

    });

    return rq
}