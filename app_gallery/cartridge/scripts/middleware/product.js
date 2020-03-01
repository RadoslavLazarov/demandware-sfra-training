'use strict';

function showProductPage(req, res, next) {
    var Site = require('dw/system/Site');
    var galleryView = Site.getCurrent().getCustomPreferenceValue('galleryView');

    res.setViewData({ galleryView: galleryView });
    next();
}

module.exports = {
    showProductPage: showProductPage
};
