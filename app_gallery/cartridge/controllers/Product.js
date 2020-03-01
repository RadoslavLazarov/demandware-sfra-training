'use strict';

var server = require('server');

var cache = require('*/cartridge/scripts/middleware/cache');
var product = require('*/cartridge/scripts/middleware/product');
var consentTracking = require('*/cartridge/scripts/middleware/consentTracking');

var base = module.superModule;

server.extend(base);

server.append('Show', cache.applyGalleryCache, consentTracking.consent, product.showProductPage);

module.exports = server.exports();
