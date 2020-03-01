'use strict';

var ComponentImageModel = require('*/cartridge/scripts/helpers/productHelpers').getScaledImage;

module.exports = function (object, product, config) {
    Object.defineProperty(object, 'componentImages', {
        enumerable: true,
        value: new ComponentImageModel(product, config)
    });
};
