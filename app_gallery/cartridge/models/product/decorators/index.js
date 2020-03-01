'use strict';

const assign = require('server/assign');

const base = module.superModule;

module.exports = assign({}, base, {
    componentImages: require('*/cartridge/models/product/decorators/componentImages')
});
