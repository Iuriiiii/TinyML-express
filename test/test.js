const { useTinyML } = require('../index.js');
const app = require('express')();

useTinyML(app, './test/views');

app.get('/', (req, res) =>
{
    res.render('index', {title: 'Título xd'});
});

app.listen(5000, () => {console.log('Servidor inicializado')});