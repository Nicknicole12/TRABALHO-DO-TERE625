import mysql from 'mysql2/promise'
import 'dotenv/config'

export default class InserirUsuarios {
    async execute(input:Input):Promise<Output>{
        try{
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USUARIO,
                database: process.env.DB_BANCO,
            });
            await connection.query(
                "INSERT INTO usuarios VALUES (?, ?, ?, ?, ?, ?, ?)",
                [input.id, input.nome, input.idade, input.cpf, input.rg, input.endereco, input.estado_civil])
                return input;
        } 
        catch (e: any) {
            console.log(e.code);
            throw new Error(e.code);
        }
    }
}
type Input = {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: 'solteiro' | 'casado' // Ajuste conforme o ENUM no banco de dados
}
type Output = Input
