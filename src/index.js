import express from 'express'; // require tên thư viện (đi vào nodemodules)
import morgan from 'morgan';
import { engine } from 'express-handlebars';

const app = express();
const port = 3000;

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine(
    {extname: '.hbs'}
));
app.set('view engine', '.hbs');
app.set('views', 'src/resources/views');

app.get('/', (req, res) => { 
    res.render('home');
})

app.get('/news', (req, res) => { 
    res.render('news');
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))