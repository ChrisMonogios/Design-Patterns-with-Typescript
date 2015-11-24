/// <element path="ValidationResolver.ts"
window.onload = function () {
    var resolver = new validators.ValidationResolver();
    var result = resolver.resolveValidation("test");
    console.log(result);
};
var validators;
(function (validators) {
    var NumberValidator = (function () {
        function NumberValidator() {
            this.applyValidator = function (value) {
                if (isNaN(value)) {
                    return false;
                }
                return true;
            };
        }
        return NumberValidator;
    })();
    validators.NumberValidator = NumberValidator;
})(validators || (validators = {}));
var validators;
(function (validators) {
    var RequiredValidator = (function () {
        function RequiredValidator() {
            this.applyValidator = function (value) {
                if (!value) {
                    return false;
                }
                return true;
            };
        }
        return RequiredValidator;
    })();
    validators.RequiredValidator = RequiredValidator;
})(validators || (validators = {}));
var validators;
(function (validators) {
    var ValidationResolver = (function () {
        function ValidationResolver() {
            var _this = this;
            this._validationRules = [];
            this.resolveValidation = function (value) {
                for (var i = 0; i < _this._validationRules.length; i++) {
                    if (!_this._validationRules[i].applyValidator(value)) {
                        return false;
                    }
                }
            };
            this._validationRules.push(new validators.NumberValidator());
            this._validationRules.push(new validators.RequiredValidator());
        }
        return ValidationResolver;
    })();
    validators.ValidationResolver = ValidationResolver;
})(validators || (validators = {}));
//# sourceMappingURL=main.js.map