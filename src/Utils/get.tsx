import { newFetch } from "./newFetch";
const get = async (page?: number) => {

    let url = page ? `/user/${page}` : '/user'
    let rq = await newFetch(url,'GET')
    let json : any = await rq.json()

    return json;
}

export default get;