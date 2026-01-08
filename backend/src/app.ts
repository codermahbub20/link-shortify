import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import { UrlControllers } from './app/modules/Url/url.controller';

const app: Application = express();

app.use(
  cors({
    origin: 'http://localhost:5173', // 
    credentials: true, 
  }),
);

app.use(express.json());

app.get('/:shortCode', UrlControllers.redirectShortUrl);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Url Shortner Task For Technext!');
});
app.use(globalErrorHandler);

export default app;