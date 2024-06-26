class ValidatePatient {

    // Address* (should be at least 10 characters)
    static address(address) {
        return address.length >= 10;
    }

    // Phone number (should be at least 10 digits + country code)
    static phone(number) {
        let phoneRegex=/^\+\d{1,3} ?\d{10}$/;
        // console.log(phoneRegex.test(number));
        return phoneRegex.test(number);
    }
}

module.exports = ValidatePatient;
