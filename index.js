require('@babel/register')({
    presets: ['@babel/preset-env']
})
require('core-js/stable')
require('regenerator-runtime/runtime')
require('./app')