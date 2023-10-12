import { User } from "../Types/User";
import { Erro } from "../Types/Erro";
import { Sucesso } from "../Types/Sucesso";
import { newFetch } from "./newFetch";
export default async function save(
    data: User | undefined,
    method: string,
    sucesso: React.Dispatch<React.SetStateAction<Sucesso | undefined>>,
    erro: React.Dispatch<React.SetStateAction<Erro | undefined>>
    ) {
    
    let rq = await newFetch("/user",method, data)


    let json: any = await rq.json()

    if (rq.ok) {
        sucesso({ "mensagem": "Dados salvos com sucesso." })
    } else {
        erro(json)
    }

    return json;
}
