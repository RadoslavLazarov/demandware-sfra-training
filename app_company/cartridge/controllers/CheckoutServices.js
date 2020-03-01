'use strict';
var server = require('server');

var base = module.superModule;

server.extend(base);

var COHelpers = require('*/cartridge/scripts/checkout/checkoutHelpers');
var csrfProtection = require('*/cartridge/scripts/middleware/csrf');

server.prepend(
    'SubmitPayment',
    server.middleware.https,
    csrfProtection.validateAjaxRequest,
    function (req, res, next) {
        var paymentForm = server.forms.getForm('billing');
        var billingFormErrors = {};
        var creditCardErrors = {};

        // verify billing form data
        billingFormErrors = COHelpers.validateBillingForm(paymentForm.addressFields);

        if (!req.form.storedPaymentUUID) {
            // verify credit card form data
            creditCardErrors = COHelpers.validateCreditCard(paymentForm);
        }

        if (!Object.keys(creditCardErrors).length || Object.keys(billingFormErrors).length) {
            this.on('route:BeforeComplete', function (req, res) { // eslint-disable-line no-shadow
                var BasketMgr = require('dw/order/BasketMgr');
                var Transaction = require('dw/system/Transaction');

                var currentBasket = BasketMgr.getCurrentBasket();

                var billingAddress = currentBasket.billingAddress;

                Transaction.wrap(function () {
                    billingAddress.setCompanyName(paymentForm.addressFields.companyName.value);
                });
            });
        }
        return next();
    }
);

module.exports = server.exports();
