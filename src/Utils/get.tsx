import getToken from "./getToken";
const get = async (page?: number) => {
    var myHeaders = new Headers();

    let url = page ? `/user/${page}` : '/user'

    const token  = getToken()

    myHeaders.set('Content-Type','application/json')
    myHeaders.set('Authorization',token)

    let rq = await fetch(url, {
        method: 'GET',
        headers: myHeaders
    });


    let json : any = await rq.json()

    return json;
}

export default get;