import express from 'express';
import userRouter from './user-router.js';
const app = express();

app.use(express.json());
app.use('/users', userRouter);
app.use((err, req, res) => {
    res.status(400).send(err);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});
