import express from 'express';

const app = express();

app.get('/', (req, res) => {
    console.log('running app');
})

app.listen(3000, () => {
    console.log('server is listening on port 3000');
})