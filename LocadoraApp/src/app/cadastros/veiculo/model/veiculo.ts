import { Tipo } from "../../tipo/model/tipo";
import { Marca } from "../../marca/model/marca";

export class Veiculo {
    id: number;
    descricao: string;
    placa: string;
    chassi: string;
    idTipo: number;
    idMarca: number;
    ano: number;
    tipo: Tipo;
    marca: Marca;
}