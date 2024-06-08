const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express'); // require tên thư viện (đi vào nodemodules)
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const methodOverride = require('method-override')
const SortMiddleware = require('./app/middlewares/SortMiddleware');

// const routes = require('./routes/index');
const routes = require('./app/api/routes/index');
const db = require('./config/db/index')

// Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(
    express.urlencoded({
        extended: true,
    }),
); // middleware xử lý dữ liệu từ form => mới có req.body
app.use(express.json()); // middleware xử lý dữ liệu từ javascript

// methodOverride
app.use(methodOverride('_method'));

// Custom middlewares
app.use(SortMiddleware);

app.use(express.static(path.join(__dirname, 'public')));

// HTTP logger
app.use(morgan('combined'));

// Template engine
app.engine('.hbs', engine({ 
    extname: '.hbs',
    helpers: {
        // helper function index
        sum(a, b) { return a + b; },

        // helper function sort
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'fa-solid fa-sort',
                asc: 'fa-solid fa-sort-up',
                desc: 'fa-solid fa-sort-down',
            };
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc',
            }
            

            const icon = icons[sortType];
            const type = types[sortType];
            
            return `<a href="?_sort&column=${field}&type=${type}">
                        <i class="${icon}"></i>
                    </a>`;
        }
    }
}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
routes(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
