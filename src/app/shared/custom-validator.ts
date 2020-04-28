export class CustomValidator {

    
    static matchPassword(group): any {
        const password = group.controls.password;
        const confirm = group.controls.confirm;
        if (password.pristine || confirm.pristine) {
            return null;
        }
        group.markAsTouched();

        if (password.value === confirm.value) {
            return null;
        }
        return {
            invalidPassword: true
        };
    }
    static numberValidator(number): any {
        if (number.pristine) {
            return null;
        } const NUMBER_REGEXP = /^-?[\d.]+(?:e-?\d+)?$/; number.markAsTouched(); if (NUMBER_REGEXP.test(number.value)) {
            return null;
        } return {
            invalidNumber: true
        };
    }
    static emailValidator(email): any {
        if (email.pristine) {
            return null;
        } const EMAIL_REGEX = new RegExp("^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$");
        email.markAsTouched();
        if (EMAIL_REGEX.test(email.value)) {
            return null;
        }
        else 
        return {
            invalidEmail: true
        };
    }
    static passwordValidator(password): any {
        if (password.pristine) {
            return null;
        } const EMAIL_REGEX = new RegExp("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).{8,}$");
        password.markAsTouched();
        if (EMAIL_REGEX.test(password.value)) {
            return null;
        }
        else 
        return {
            invalidPassword: true
        };
    }
    static phoneValidator(number): any {
        if (number.pristine) {
            return null;
        } const PHONE_REGEXP = /^[0-9]{3}\s*[0-9]{3}\s*[0-9]{4}$/; number.markAsTouched(); if (PHONE_REGEXP.test(number.value)) {
            return null;
        } return {
            invalidNumber: true
        };
    }
    static zipCodeValidator(zip): any {
        if (zip.pristine) {
            return null;
        } const ZIP_REGEXP = /^[0-9]{5}(?:-[0-9]{4})?$/; zip.markAsTouched(); if (ZIP_REGEXP.test(zip.value)) {
            return null;
        } return {
            invalidZip: true
        };
    }
}