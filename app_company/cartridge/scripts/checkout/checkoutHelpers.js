'use strict';

const assign = require('server/assign');
const base = module.superModule;

var BasketMgr = require('dw/order/BasketMgr');
var Transaction = require('dw/system/Transaction');

function copyCustomerAddressToShipment(address, shipmentOrNull) {
    base.copyCustomerAddressToShipment.call(this, address, shipmentOrNull);

    var currentBasket = BasketMgr.getCurrentBasket();
    var shipment = shipmentOrNull || currentBasket.defaultShipment;
    var shippingAddress = shipment.shippingAddress;

    Transaction.wrap(function () {
        if (shippingAddress === null) {
            shippingAddress = shipment.createShippingAddress();
        }
        shippingAddress.setCompanyName(address.companyName);
    });
}


function copyCustomerAddressToBilling(address) {
    base.copyCustomerAddressToBilling.call(this, address);

    var currentBasket = BasketMgr.getCurrentBasket();
    var billingAddress = currentBasket.billingAddress;

    Transaction.wrap(function () {
        if (!billingAddress) {
            billingAddress = currentBasket.createBillingAddress();
        }
        billingAddress.setCompanyName(address.companyName);
    });
}

function copyShippingAddressToShipment(shippingData, shipmentOrNull) {
    base.copyShippingAddressToShipment.call(this, shippingData, shipmentOrNull);

    var currentBasket = BasketMgr.getCurrentBasket();
    var shipment = shipmentOrNull || currentBasket.defaultShipment;
    var shippingAddress = shipment.shippingAddress;

    Transaction.wrap(function () {
        if (shippingAddress === null) {
            shippingAddress = shipment.createShippingAddress();
        }
        shippingAddress.setCompanyName(shippingData.address.companyName);
    });
}

function copyBillingAddressToBasket(address, currentBasket) {
    base.copyBillingAddressToBasket.call(this, address, currentBasket);

    var billingAddress = currentBasket.billingAddress;

    Transaction.wrap(function () {
        if (!billingAddress) {
            billingAddress = currentBasket.createBillingAddress();
        }
        billingAddress.setCompanyName(address.companyName);
    });
}

module.exports = assign({}, base, {
    copyCustomerAddressToShipment: copyCustomerAddressToShipment,
    copyShippingAddressToShipment: copyShippingAddressToShipment,
    copyCustomerAddressToBilling: copyCustomerAddressToBilling,
    copyBillingAddressToBasket: copyBillingAddressToBasket
});
