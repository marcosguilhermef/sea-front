import { Table, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import './style.css'

type User = {
    id: number,
    user: string,
    createdAt: string,
    updatedAt: string,
    level: number
}


const get = async (page?: number) => {
    var myHeaders = new Headers();

    let url = page ? `http://127.0.0.1:3333/user/${page}` : 'http://127.0.0.1:3333/user'


    let rq = await fetch(url);


    let json : any = await rq.json()

    console.log(json.data)

    return json;
}

const deletar = async (_id: number) => {
    var myHeaders = new Headers();


    let rq = await fetch("http://127.0.0.1:3333/user", { 
        body: JSON.stringify({ id: _id }),
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
    
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
                                        <a onClick={async () => await deletar(e?.id)} className="mx-1" style={{ cursor: "pointer" }}>[EXCLUIR]</a>
                                        <a href={`/users/${e?.id}`} className="mx-1">[EDITAR]</a>
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