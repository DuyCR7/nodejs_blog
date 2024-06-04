        const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express'); // require tên thư viện (đi vào nodemodules)
                const morgan = require('morgan');
const { engine } = require('express-handlebars');

const route = require('./routes/index');

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true,
    }),
); // middleware xử lý dữ liệu từ form
app.use(express.json()); // middleware xử lý dữ liệu từ javascript

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', 'src/resources/views');

// Routes init
route(app);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`),
);
