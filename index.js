const { translate } = require('tinyml-core'); 
const fs = require('fs');

/**
 * The TinyML-express engine.
 * 
 * @param {String} path 
 * @param {Object} options 
 * @param {Function} callback 
 */
function __express(path, options, callback)
{
    fs.readFile(path, (err, content) =>
    {
        if(err)
            return callback(new Error(err));

        let translation = translate(content.toString());

        return callback(null, translation.success ? translation.content : translation.description, options);
    });
}

/**
 * Register the TinyML-express engine on express.
 * 
 * @param {Express} app 
 * @param {String|Array} [path=views] 
 * @returns {Boolean}
 */
function useTinyML(app, path = 'views')
{
    if(!app instanceof require('express'))
        return false;
    
    app.engine('timl', __express);
    app.set('views', path);
    app.set('view engine', 'timl');

    return true;
}

module.exports = Object.freeze({__express: __express, useTinyML: useTinyML});