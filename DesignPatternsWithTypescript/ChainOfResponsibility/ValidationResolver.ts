module validators {
    export class ValidationResolver {
        private _validationRules = [];

        constructor() {
            this._validationRules.push(new NumberValidator());
            this._validationRules.push(new RequiredValidator());
        }

        resolveValidation = (value: any): boolean => {
            for (var i = 0; i < this._validationRules.length; i++) {
                if (!this._validationRules[i].applyValidator(value)) {
                    return false;
                }
            }
            return true;
        }
    }
}