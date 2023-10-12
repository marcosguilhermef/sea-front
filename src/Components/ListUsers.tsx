import { Table, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'


type User = {
    id: number,
    user: string,
    createdAt: string,
    updatedAt: string,
    level: number
}


const get = async (page?: number) => {
    var myHeaders = new Headers();

    let url = page ? `/user/${page}` : '/user'

    const token  = localStorage.getItem('token') || ""

    myHeaders.set('Content-Type','application/json')
    myHeaders.set('Authorization',token)

    let rq = await fetch(url, {
        method: 'GET',
        headers: myHeaders
    });


    let json : any = await rq.json()

    return json;
}

const deletar = async (_id: number) => {
    var myHeaders = new Headers();

    const token  = localStorage.getItem('token') || ""

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

const redirect = (_url: string) => {
    window.location.href =  _url
}

const ListUsers = () => {
    const [ users, setUsers ] = useState<User[] | []>( [])
    const [ page, setPage] = useState<number>(0)


    useEffect( () => {
        get().then( e => setUsers(e?.data))
    },[])


    async function getPage(p: number){
        setPage(p)
        await get(p).then( e => {
            setUsers(e?.data)
        })
    }

    return(
        <>
            <Button as="a" href="/users/add-user" className="my-4" style={{ direction: 'ltr' }}>
                Adicionar Usuário
            </Button>
            <Table>
                <thead>
                    <tr>
                        <th>
                            #id
                        </th>
                        <th>
                            Login
                        </th>
                        <th>
                            Created_at
                        </th>
                        <th>
                            Updated_at
                        </th>
                        <th>
                            Opções
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map( e => {
                            return(
                                <tr>
                                    <td> { e?.id} </td>
                                    <td> { e?.user} </td>
                                    <td> { e?.createdAt} </td>
                                    <td> { e?.updatedAt} </td>
                                    <td>
                                        <FontAwesomeIcon onClick={async () => await deletar(e?.id)} icon={faTrash}  className="mx-1" style={{ cursor: "pointer", color: "red", fontSize: "1.2rem" }}/>
                                        <FontAwesomeIcon  onClick={ () => window.location.href =`/users/${e?.id}` } icon={faPencil}  className="mx-1" style={{ cursor: "pointer", color: "greem", fontSize: "1.2rem" }}/>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
            <div className="page-controller">
                <a href="#" onClick={async () => await getPage(page-1)} style={{ cursor: "pointer" }}>Voltar</a> 
                <a href="#">{ page }</a>
                <a href="#" onClick={async () => await getPage(page+1)} style={{ cursor: "pointer" }}>Avançar</a>
            </div>
        </>
    )
}

export default ListUsers