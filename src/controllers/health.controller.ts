import type { Request, Response } from 'express';
import { env } from '../config/env.js';
import { checkDatabaseHealth } from '../services/database.service.js';

export const getHealth = (_req: Request, res: Response): void => {
  res.status(200).json({
    data: {
      status: 'up',
      version: env.APP_VERSION,
      environment: env.NODE_ENV
    }
  });
};

export const getDatabaseHealth = async (_req: Request, res: Response): Promise<void> => {
  const isUp = await checkDatabaseHealth();
  const data = { status: isUp ? 'up' : 'down' };
  res.status(isUp ? 200 : 503).json({ data });
};