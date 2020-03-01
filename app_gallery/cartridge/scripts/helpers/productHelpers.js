'use strict';

const assign = require('server/assign');
const base = module.superModule;

const collections = require('*/cartridge/scripts/util/collections');
const Site = require('dw/system/Site');

function getGalleryHeight() {
    const galleryHeight = Site.getCurrent().getCustomPreferenceValue('galleryHeight');
    if (galleryHeight) {
        return Number(galleryHeight);
    } else {
        return 240;
    }
}

function getGalleryWidth() {
    const galleryWidth = Site.getCurrent().getCustomPreferenceValue('galleryWidth');
    if (galleryWidth) {
        return Number(galleryWidth);
    } else {
        return 360;
    }
}

function getScaledImage(product, imageConfig) {
    imageConfig.types.forEach(function (type) {
        var images = product.getImages(type);
        var result = {};

        if (imageConfig.quantity === 'single') {
            var firstImage = collections.first(images);
            if (firstImage) {
                result = [{
                    alt: firstImage.alt,
                    url: image.getAbsImageURL( { scaleWidth: getGalleryWidth(), scaleHeight: getGalleryHeight() } ).toString(),
                    title: firstImage.title
                }];
            }
        } else {
            result = collections.map(images, function (image) {
                return {
                    alt: image.alt,
                    url: image.getAbsImageURL( { scaleWidth: getGalleryWidth(), scaleHeight: getGalleryHeight() } ).toString(),
                    title: image.title
                };
            });
        }
        this[type] = result;
    }, this);
}

module.exports = assign({}, base, {
    getScaledImage: getScaledImage
});
