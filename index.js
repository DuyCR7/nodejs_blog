const express = require('express'); // require tên thư viện (đi vào nodemodules)
const morgan = require('morgan')
const app = express();
const port = 3000

app.use(morgan('combined'))

app.get('/tin-tuc', (req, res) => { 
    return res.send('Welcome DuyCR7')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))