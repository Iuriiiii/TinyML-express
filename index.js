const { compile } = require('tinyml-core'); 
const fs = require('fs');

const selfCloseTags = ['img', 'br', 'input', 'link', 'meta', 'area', 'source', 'base', 'col', 'option', 'embed', 'hr', 'param', 'track'];

function toParams(params)
{
    return (params || '')  === '' ? '' : ` ${params}`;
}

function toHTML(obj)
{
    if(typeof obj === 'string')
        return obj;

    let params = toParams(obj.params);

    if(selfCloseTags.includes(obj.tag))
        return `<${obj.tag}${params}/>`;

    let source = `<${obj.tag}${params}>`;

    obj.childs.forEach(e => {
        source += toHTML(e);
    });

    return `${source}</${obj.tag}>`;
}

/**
 * Traduces TinyML's source code to HTML's source code.
 * 
 * @param {String} source 
 * @param {Object} properties 
 * @returns 
 */
function translate(source, properties = {})
{
    let compiledTML = compile(source, properties);

    if('description' in compiledTML)
        return compiledTML.description;

    return compiledTML.reduce((html, element) => {
        return html += toHTML(element);
    }, '');
}

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

        return callback(null, translate(content.toString(), options));
    });
}

const express  = require('express');

/**
 * Register the TinyML-express engine on express.
 * 
 * @param {Express} app 
 * @param {String|Array} path 
 * @returns {Boolean}
 */
function useTinyML(app, path = 'views')
{
    if(!app instanceof express)
        return false;
    
    app.engine('timl', __express);
    app.set('views', path);
    app.set('view engine', 'timl');

    return true;
}

module.exports = Object.freeze({translate: translate, __express: __express, useTinyML: useTinyML});