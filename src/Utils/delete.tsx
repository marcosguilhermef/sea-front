import getToken from "./getToken";
import { newFetch } from "./newFetch";
const deletar = async (_id: number) => {
    var myHeaders = new Headers();

    const token  = getToken()

    myHeaders.set('Content-Type','application/json')
    myHeaders.set('Authorization',token)


    let rq = await newFetch("/user",'DELETE', { id: _id })


    let json : any = await rq.json()

    if(rq.ok){
        window.location.reload()
    }

    return json;
}

export default deletar;