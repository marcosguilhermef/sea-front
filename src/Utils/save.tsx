import { User } from "../Types/User";
import { Erro } from "../Types/Erro";
import { Sucesso } from "../Types/Sucesso";
import getToken from "./getToken";
export default async function save(
    data: User | undefined,
    method: string,
    sucesso: React.Dispatch<React.SetStateAction<Sucesso | undefined>>,
    erro: React.Dispatch<React.SetStateAction<Erro | undefined>>
    ) {
    
    const token  = getToken()

    let rq = await fetch("/user", {
        body: JSON.stringify(data),
        method: method,
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
