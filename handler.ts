import express, { Request, Response } from 'express';
import route from './routes/api';
import bodyParser from 'body-parser';
import { sessionConfig } from './config/session';
import sls from 'serverless-http';


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(sessionConfig);

app.get('/', async (req: Request, res: Response) => {
    return res.status(200).send('Hello World!');
  });
  
app.get('/welcome', async (req: Request, res: Response) => {
    return res.status(200).send('Hello Zulkifli!');
});

app.use('/api', route)

app.get('/api/welcome', (req: Request, res: Response) => {
    return res.send('Test - PT.Surya Digital Teknologi!');
});

// app.listen(port, () => {
//     console.log(`\n${ appName } (${appEnv}) listening to http://localhost:${ port }`)
// })

export const handler = sls(app);

