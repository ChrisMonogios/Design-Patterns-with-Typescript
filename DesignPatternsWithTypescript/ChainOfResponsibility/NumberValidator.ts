module validators {
    export class NumberValidator implements IValidator {
        applyValidator = (value: any): boolean => {
            if (isNaN(value)) {
                return false;
            }
            return true;
        }
    }
}