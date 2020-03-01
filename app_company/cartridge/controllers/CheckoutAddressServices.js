'use strict';

var server = require('server');

var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

var base = module.superModule;

server.extend(base);

server.append(
    'AddNewAddress',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var form = server.forms.getForm('shipping');
        var shippingFormErrors = COHelpers.validateShippingForm(form.shippingAddress.addressFields);
        var result = res.getViewData();

        if (!Object.keys(shippingFormErrors).length > 0) {
            result.address = {
                companyName: form.shippingAddress.addressFields.companyName.value
            };

            res.setViewData(result);
        }

        return next();
    }
);

module.exports = server.exports();
