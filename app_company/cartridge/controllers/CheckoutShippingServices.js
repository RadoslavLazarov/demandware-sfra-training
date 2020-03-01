'use strict';

var csrfProtection = require('*/cartridge/scripts/middleware/csrf');
var server = require('server');

var base = module.superModule;

server.extend(base);

server.append('SelectShippingMethod', server.middleware.https, function (req, res, next) {
    var Transaction = require('dw/system/Transaction');
    var BasketMgr = require('dw/order/BasketMgr');
    var ShippingHelper = require('*/cartridge/scripts/checkout/shippingHelpers');

    var currentBasket = BasketMgr.getCurrentBasket();

    var shipmentUUID = req.querystring.shipmentUUID || req.form.shipmentUUID;
    var shipment;

    if (shipmentUUID) {
        shipment = ShippingHelper.getShipmentByUUID(currentBasket, shipmentUUID);
    } else {
        shipment = currentBasket.defaultShipment;
    }

    this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
        var address = res.getViewData().address;

        Transaction.wrap(function () {
            var shippingAddress = shipment.shippingAddress;
            shippingAddress.setCompanyName(address.companyName || '');
        });
    });

    return next();
});

server.append('SubmitShipping',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');

        var form = server.forms.getForm('shipping');
        var result = res.getViewData();

        // verify shipping form data
        var shippingFormErrors = COHelpers.validateShippingForm(form.shippingAddress.addressFields);

        if (!Object.keys(shippingFormErrors).length > 0) {
            result.address.companyName = form.shippingAddress.addressFields.companyName.value;
            res.setViewData(result);
        }

        return next();
    });

module.exports = server.exports();
