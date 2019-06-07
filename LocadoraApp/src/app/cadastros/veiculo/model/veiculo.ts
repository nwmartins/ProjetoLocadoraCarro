import { Tipo } from "../../tipo/model/tipo";

export class Veiculo {
    id: number;
    descricao: string;
    placa: string;
    chassi: string;
    idTipo: number;
    idMarca: number;
    ano: number;
    tipo: Tipo;
}