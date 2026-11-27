import mongoose from 'mongoose';
import { env } from '../config/env.js';

export const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(env.MONGODB_URI, {
      dbName: env.MONGODB_DB_NAME,
    });
    console.log('¡Conectado exitosamente a MongoDB Atlas!');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Desconectado de MongoDB.');
  } catch (error) {
    console.error('Error al desconectar de MongoDB:', error);
  }
};

export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    const state = mongoose.connection.readyState;
    return state === 1;
  } catch {
    return false;
  }
};