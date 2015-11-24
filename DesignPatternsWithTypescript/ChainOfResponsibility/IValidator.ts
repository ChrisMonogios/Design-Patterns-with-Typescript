module validators {
    export interface IValidator {
        applyValidator(value: any): boolean;
    }
}