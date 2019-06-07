import { Cliente } from "../../cliente/model/cliente";
import { Veiculo } from "../../veiculo/model/veiculo";

export class Locacao {
    id: number;
    idCliente: number;
    idVeiculo: number;
    valor: number;
    dtLocacao: Date;
    dtEntrega: Date;
    cliente: Cliente;
    veiculo: Veiculo;
}