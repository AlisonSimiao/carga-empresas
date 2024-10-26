import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// Abrir o banco de dados SQLite
async function connectToDatabase() {
  const db = await open({
    filename: './database.db', // Caminho do banco de dados (será criado se não existir)
    driver: sqlite3.Database,
  });
  
  return db;
}

// Função para configurar a tabela (apenas para exemplo)
export async function setupDatabase() {
  const db = await connectToDatabase();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS resources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
    );

    CREATE TABLE IF NOT EXISTS links (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      idResource
    );
  `);
  
  console.log("Tabela criada com sucesso (se não existia anteriormente).");

  await db.close();
}

// Função para inserir dados
async function insertData(codigo: string, descricao: string) {
  const db = await connectToDatabase();

  await db.run(`INSERT INTO items (codigo, descricao) VALUES (?, ?)`, codigo, descricao);
  console.log(`Item inserido: ${codigo} - ${descricao}`);
  
  await db.close();
}

// Função para consultar os dados
async function queryData() {
  const db = await connectToDatabase();

  const rows = await db.all(`SELECT * FROM items`);
  
  rows.forEach((row) => {
    console.log(`ID: ${row.id}, Código: ${row.codigo}, Descrição: ${row.descricao}`);
  });
  
  await db.close();
}

// Execução do código
(async () => {
  await setupDatabase(); // Configura a tabela

  await insertData('001', 'Item Exemplo 1'); // Inserir dados
  await insertData('002', 'Item Exemplo 2'); // Inserir mais dados
  
  console.log('Consulta dos dados:');
  await queryData(); // Consultar dados
})();
