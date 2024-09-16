import mysql, { RowDataPacket } from 'mysql2/promise'
import 'dotenv/config'
type Output = {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: 'solteiro' | 'casado' // ENUM definido no banco de dados
}
interface UsuarioRowDataPacket extends RowDataPacket {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: 'solteiro' | 'casado' // ENUM definido no banco de dados
}

class ListaUsuarios {
    async execute() {
        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USUARIO,
                database: process.env.DB_BANCO,
            });
            const [rows, filds] = await connection.query("SELECT * from usuarios");
            const dados = rows as UsuarioRowDataPacket[];
            const usuariosDoBanco: Output[] = [];
            for (let linha of dados) {
                const { id, nome, idade, cpf, rg, endereco, estado_civil} = { ...linha };
                const usuario = {
                    id,
                    nome,
                    idade,
                    cpf,
                    rg,
                    endereco,
                    estado_civil
                };
                usuariosDoBanco.push(usuario);
            }
            return usuariosDoBanco;
        } 
        catch (e: any) {
            if (e.code === 'ER_NO_SUCH_TABLE') {
                console.log("A tabela 'usuarios' não foi criada. Crie a tabela no banco de dados!");
            } else if (e.code === "ER_PARSE_ERROR") {
                console.log("Sua query está com algo errado:");
                console.log("Verifique: vírgulas, pontos e nome de colunas.");
            } else if (e.code === 'ECONNREFUSED') {
                console.log("LIGAR O SERVIDOR! Conexão recusada.");
            } else if (e.code === 'ER_BAD_DB_ERROR') {
                console.log("Deve criar o banco de dados {test}.");
            } else {
                console.log("Erro ao conectar no banco", e);
            }
        }
    }
}
export default ListaUsuarios;
