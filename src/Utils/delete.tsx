import getToken from "./getToken";
const deletar = async (_id: number) => {
    var myHeaders = new Headers();

    const token  = getToken()

    myHeaders.set('Content-Type','application/json')
    myHeaders.set('Authorization',token)


    let rq = await fetch("/user", { 
        body: JSON.stringify({ id: _id }),
        method: 'DELETE',
        headers: myHeaders
    });


    let json : any = await rq.json()

    if(rq.ok){
        window.location.reload()
    }

    return json;
}

export default deletar;