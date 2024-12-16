import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    console.log('running app');
})

app.listen(PORT, () => {
    console.log('server is listening on port 3000');
})