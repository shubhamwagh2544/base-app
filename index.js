import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('Shubham says Hello...!');
})

app.listen(8080, () => {
    console.log('server started on 8080');
});
