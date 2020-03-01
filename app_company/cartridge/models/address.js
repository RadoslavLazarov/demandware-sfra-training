'use strict';

const base = module.superModule;

/**
 * Address class that represents an orderAddress
 * @param {dw.order.OrderAddress} addressObject - User's address
 * @constructor
 */
function address(addressObject) {
    base.call(this, addressObject);
    var addressFromAddressBook;

    if (addressObject) {
        if (addressObject.companyName) {
            this.address.companyName = addressObject.companyName;
        } else {
            addressFromAddressBook = customer.addressBook
                ? customer.addressBook.getAddress(addressObject.ID) : null;
            if (addressFromAddressBook) {
                this.address.companyName = addressFromAddressBook.companyName;
            }
        }
    }
}

module.exports = address;
