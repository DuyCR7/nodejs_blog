const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express'); // require tên thư viện (đi vào nodemodules)
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')

const route = require('./routes/index');
const db = require('./config/db/index')

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true,
    }),
); // middleware xử lý dữ liệu từ form
app.use(express.json()); // middleware xử lý dữ liệu từ javascript

// methodOverride
app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine({ 
    extname: '.hbs',
    helpers: {
        sum(a, b) { return a + b; },
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
