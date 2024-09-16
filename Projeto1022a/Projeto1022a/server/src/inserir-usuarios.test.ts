import { expect, test, beforeAll, afterAll } from 'vitest';
import mysql from 'mysql2/promise';
import 'dotenv/config';
import ListaUsuarios from './lista-usuarios';
import InserirUsuarios from './inserir-usuarios';

beforeAll(async()=>{
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
});
afterAll(async () => {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USUARIO,
        database: process.env.DB_BANCO,
    });
    await connection.query("DELETE FROM usuarios");
});
test("Deve inserir um usuário no banco de dados", async () => {
    // GIVEN
    const usuarioParaInserir:usuario = {
        id: 1,
        nome: "João",
        idade: 18,
        cpf: "036.547.382-10",
        rg: "002.874.325",
        endereco: "Rua das flores, Bairro dos Planetas, Número 10, Naviraí - MS",
        estado_civil: "casado"
    };
    // WHEN
    const inserirUsuarios = new InserirUsuarios();
    const usuarioBanco = await inserirUsuarios.execute(usuarioParaInserir);
    // THEN
    expect(usuarioBanco).toStrictEqual(usuarioParaInserir);
    const listaUsuarios = new ListaUsuarios();
    const usuarios = await listaUsuarios.execute();
    expect(usuarios).toContainEqual(usuarioParaInserir);
});
type usuario = {
    id: number,
    nome: string,
    idade: number,
    cpf: string,
    rg: string,
    endereco: string,
    estado_civil: 'solteiro' | 'casado' // Ajuste conforme o ENUM no banco de dados
}
