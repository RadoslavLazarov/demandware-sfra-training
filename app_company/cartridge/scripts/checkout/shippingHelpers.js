'use strict';

const assign = require('server/assign');
const base = module.superModule;

/**
 * Retrieve raw address JSON object from request.form
 * @param {Request} req - the DW Request object
 * @returns {Object} - raw JSON representing address form data
 */
function getAddressFromRequest(req) {
    var baseAddressFromRequest = base.getAddressFromRequest.call(this, req);

    if (baseAddressFromRequest) {
        baseAddressFromRequest.companyName = req.form.companyName;
    }

    return baseAddressFromRequest;
}

module.exports = assign({}, base, {
    getAddressFromRequest: getAddressFromRequest,
});
