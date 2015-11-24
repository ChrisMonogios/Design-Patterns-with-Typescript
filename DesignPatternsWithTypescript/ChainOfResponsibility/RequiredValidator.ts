module validators {
    export class RequiredValidator implements IValidator {
        applyValidator = (value: any): boolean => {
            if (!value) {
                return false;
            }
            return true;
        }
    }
}