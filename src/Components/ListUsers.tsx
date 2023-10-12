import { Table, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPencil } from '@fortawesome/free-solid-svg-icons'
import get from "../Utils/get"
import deletar from "../Utils/delete"

type User = {
    id: number,
    user: string,
    createdAt: string,
    updatedAt: string,
    level: number
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
                <a href="/#" onClick={async () => await getPage(page-1)} style={{ cursor: "pointer" }}>Voltar</a> 
                <a href="/#">{ page }</a>
                <a href="/#" onClick={async () => await getPage(page+1)} style={{ cursor: "pointer" }}>Avançar</a>
            </div>
        </>
    )
}

export default ListUsers