const express = require('express'); // require tên thư viện (đi vào nodemodules)
const app = express();
const port = 3000

app.get('/tin-tuc', (req, res) => { 
    var a = 1;
    var b = 2;

    var c = a + b;
    return res.send('Welcome DuyCR7')
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))