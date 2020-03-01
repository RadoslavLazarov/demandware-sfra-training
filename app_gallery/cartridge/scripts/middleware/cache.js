'use strict';

const assign = require('server/assign');

var base = module.superModule;

function applyGalleryCache(req, res, next) {
    res.cachePeriod = 36; // eslint-disable-line no-param-reassign
    res.cachePeriodUnit = 'hours'; // eslint-disable-line no-param-reassign
    next();
}

module.exports = assign({}, base, {
    applyGalleryCache: applyGalleryCache
});
