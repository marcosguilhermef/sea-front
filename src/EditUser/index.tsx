import { Form, Container, Button } from "react-bootstrap";
import { useState } from "react";
import Alert from 'react-bootstrap/Alert';
import { useParams } from "react-router-dom";
import { User } from "../Types/User";
import { Erro } from "../Types/Erro";
import { Sucesso } from "../Types/Sucesso";
import save from "../Utils/save";

const EditUser = () => {

    const [data, setData] = useState<User | undefined>({ level: 0 });
    const [sucesso, setSucesso] = useState<Sucesso | undefined>();
    const [erro, setErro] = useState<Erro | undefined>();
    let { id } = useParams();

    function handle(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target
        setData((e: any) => ({ ...e, [name]: value, "id": parseInt(id || "0") }))
    }

    async function send() {
        setSucesso(undefined)
        setErro(undefined)
        await save(data,'PUT', setSucesso, setErro)
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