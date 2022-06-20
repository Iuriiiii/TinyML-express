# TinyML - Express

Here is the <a href="https://github.com/Iuriiiii/TinyML-core">TinyML</a> engine for <a href="https://expressjs.com/">Express</a>.

## Installation

If you are so kind to excuse me, you could use this repo as way to install the module.

    npm install https://github.com/Iuriiiii/TinyML-express.git

## Usage

The `tinyml-express` module will return an object with two util functions 4u. You just need to require them.

    const tinyML = require('tinyml-express');

This could be the most easy example of TinyML's usage, supposing that you just need the TinyML-express's render engine.

    const { useTinyML } = require('tinyml-express');
    const app = require('express')();

    useTinyML(app, './views');

    app.get('/', (req, res) => {
        res.render('index', {title: 'title'});
    });

    app.listen(5000, () => {
        console.log('server started')
    });

If you want to implement the engine to express by yourself, you can use the `__express` method <a href="https://expressjs.com/es/4x/api.html#app.engine">as you can see on this example</a>.

## API doc

### `useTinyML`

This method is a simple utility that will make your life easlier, its job is register the TinyML engine to express for you.

It has two parameters.

1. The app express object.
2. The views directory, by default `views`.

Returns a boolean.

The TinyML's format is `timl`. 

### `__express`

Is the TinyML engine for expresss. Its operation and syntax is the same as whichever express engine.