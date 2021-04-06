import express, { Application } from 'express';
import { routes } from '../Controllers/router';

// Boot express
export const app: Application = express();

// Application routing
routes(app);
