import { Form, Container, Button } from "react-bootstrap";
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';

type User = {
    user?: string,
    password?: string,
    level: number
}

type Sucesso = {
    mensagem: string,
}

type Erro = {
    error: string,
    id?: number[],
    user?: string[],
    level?: string[],
    password?:string[]
}


const save = async (data: User | undefined,sucesso: React.Dispatch<React.SetStateAction<undefined | Sucesso>>,erro: React.Dispatch<React.SetStateAction<Erro | undefined>>) => {
    
    var myHeaders = new Headers();

    let token  = localStorage.getItem('token') || ""

    let rq = await fetch("/user", {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": token
        },

    });

    let json: any = await rq.json()

    if (rq.ok) {
        sucesso({ "mensagem": "Dados salvos com sucesso." })
    } else {
        erro(json)
    }

    return json;
}

const EditUser = () => {

    const [data, setData] = useState<User | undefined>({ level: 0 });
    const [sucesso, setSucesso] = useState<Sucesso | undefined>();
    const [erro, setErro] = useState<Erro | undefined>();

    function handle(e: React.ChangeEvent<HTMLInputElement>) {

        const { name, value } = e.target

        setData((e: any) => ({ ...e, [name]: value }))
    }

    async function send() {
        setSucesso(undefined)
        setErro(undefined)
        await save(data, setSucesso, setErro)
    }

    return (
        <>
            <Alert hidden={!sucesso}>
                {sucesso?.mensagem}
            </Alert>
            <Alert hidden={!erro} variant="danger">
                {erro?.error}
            </Alert>
            <Container>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Label>Login:</Form.Label>
                        <Form.Control type="text" name="user" onChange={handle} isInvalid={!!erro?.user}/>
                        <Form.Control.Feedback type="invalid">
                            <ul>
                                { erro?.user?.map(( e ) => ( e )) }
                            </ul>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Senha:</Form.Label>
                        <Form.Control type="password" name="password" onChange={handle} isInvalid={!!erro?.password}/>
                        <Form.Control.Feedback type="invalid">
                            <ul>
                                { erro?.password?.map(( e ) => ( e )) }
                            </ul>
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Button className="w-100" onClick={async () => await send()}>Salvar</Button>
                    </Form.Group>
                </Form>
            </Container>
        </>
    );
}

export default EditUser;