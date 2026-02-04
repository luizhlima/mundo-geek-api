import 'dotenv/config'; 
import { DataSource } from 'typeorm';
import { Categoria } from '../entities/Categoria.js'; 
import { Produto } from '../entities/Produto.js'; 

const getEnvVar = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Variável de ambiente ${key} não definida. Verifique seu arquivo .env.`);
    }
    return value;
};

export const AppDataSource = new DataSource({
    type: "postgres",
    host: getEnvVar('DB_HOST'),
    username: getEnvVar('DB_USERNAME'),
    password: getEnvVar('DB_PASSWORD'),
    database: getEnvVar('DB_DATABASE'),
    
    port: parseInt(process.env.DB_PORT || '5432', 10),         
    synchronize: true,
    logging: false,
    entities: [Categoria, Produto],
    migrations: [],
    subscribers: [],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Conexão com o banco de dados inicializada com sucesso!");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
        throw error;
    }
} 