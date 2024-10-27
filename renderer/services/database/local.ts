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
      idResource INTEGER
      ref TEXT
    );
  `);
  
  console.log("Tabela criada com sucesso (se não existia anteriormente).");

  await db.close();
}

export async function getResource(resource: string) {
  const db = await connectToDatabase();

  await db.run(`
      select * from resources
      left join links on links.idResource = resources.id
    `);
  
  await db.close(); 
}
