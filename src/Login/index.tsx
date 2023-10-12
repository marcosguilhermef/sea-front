import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import './login.css'
import handle from "../Utils/handle"
import { User } from '../Types/User'
import { Erro } from '../Types/Erro'


const save = async (data: User | undefined,sucesso: React.Dispatch<React.SetStateAction<undefined | string>>,erro: React.Dispatch<React.SetStateAction<Erro | undefined>>) => {
    
    let rq = await fetch("/login", {
        body: JSON.stringify(data),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

    });

    let json: any = await rq.json()

    if (rq.ok) {
        sucesso(json.token)
    } else {
        erro(json)
    }

    return json;
}


const Login = () => {

    const [data, setData] = useState<User | undefined>()
    const [sucesso, setSucesso] = useState<string>();
    const [erro, setErro] = useState<Erro | undefined>();

    async function send() {
        setSucesso(undefined)
        setErro(undefined)
        await save(data, setSucesso, setErro)
    }

    useEffect(() => {
            if((typeof sucesso !== 'undefined')){
                setSucesso(sucesso)
                localStorage.setItem('token',sucesso)
                window.location.href = "/"
            }
    },[sucesso])

    useEffect(() => {
        let token = localStorage.getItem('token')
        if(token){
            window.location.href = "/"
        }
    },[])

    function change(e: React.ChangeEvent<HTMLInputElement>){
        handle<User | undefined>(e, setData)
    }


    return (
        <div className="hold-transition login-page">
            <div className="login-box">
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <form>
                            <Form.Group className="mb-3">
                                <Form.Label>Login:</Form.Label>
                                <Form.Control type="text" name="user" onChange={change} isInvalid={!!erro?.user}/>
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        { erro?.user?.map(( e ) => ( <li>{ e }</li>)) }
                                    </ul>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control type="password" name="password" onChange={change} isInvalid={!!erro?.password}/>
                                <Form.Control.Feedback type="invalid">
                                    <ul>
                                        { erro?.password?.map(( e ) => (<li>{ e }</li>)) }
                                    </ul>
                                </Form.Control.Feedback>
                            </Form.Group>
                            <div className="row">
                                <div className="col-12">
                                    <button type="button" onClick={send} className="btn btn-primary btn-block">Login</button>
                                </div>
                            </div>
                        </form>                        
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;