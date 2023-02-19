import express, { Request, Response, NextFunction } from 'express';
import { useRouter } from './users/users.js';

const app = express();
const port = 8000;

app.use((req, res, next) => {
    console.log('time', Date.now())
    next()
})

app.get('/hello', (req, res) => {
    // throw Error('asd')
    res.send({ succes: true });
});

app.use('/user', useRouter)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('errrrer', err.message)
    res.status(401).send(err.message)
})

app.listen(port, () => {
    console.log(`сервер запущен ${port}`);
});
