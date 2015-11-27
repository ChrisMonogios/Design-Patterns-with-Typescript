/// <element path="ValidationResolver.ts">
/// <element path="Customer.ts">
/// <element path="Stock.ts">
window.onload = function () {
    // Chain of responsibility:
    var resolver = new validators.ValidationResolver();
    var example1 = resolver.resolveValidation("test");
    console.log(example1);
    var example2 = resolver.resolveValidation(2);
    console.log(example2);
    // Observer
    var customer1 = new observer.Customer("Christos Monogios");
    var customer2 = new observer.Customer("John Doe");
    var stock1 = new observer.Stock("oil company");
    customer1.buyStock(stock1, 150);
    customer2.buyStock(stock1, 10);
    stock1.subscribe(customer1);
    stock1.subscribe(customer2);
    stock1.setPrice(19);
    stock1.setPrice(200);
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
                return true;
            };
            this._validationRules.push(new validators.NumberValidator());
            this._validationRules.push(new validators.RequiredValidator());
        }
        return ValidationResolver;
    })();
    validators.ValidationResolver = ValidationResolver;
})(validators || (validators = {}));
var observer;
(function (observer) {
    var Customer = (function () {
        function Customer(name) {
            var _this = this;
            this.onPriceChange = function (price) {
                for (var i = 0; i < _this.ownedStocks.length; i++) {
                    if (price > _this.ownedStocks[i][1]) {
                        console.log(_this.name + " sold his " + _this.ownedStocks[i][0].Name + " stocks!");
                    }
                }
            };
            this.buyStock = function (stock, whenToSell) {
                if (typeof _this.ownedStocks === "undefined") {
                    _this.ownedStocks = [[stock, whenToSell]];
                }
                else {
                    _this.ownedStocks.push([stock, whenToSell]);
                }
            };
            this.name = name;
        }
        return Customer;
    })();
    observer.Customer = Customer;
})(observer || (observer = {}));
var observer;
(function (observer) {
    var Stock = (function () {
        function Stock(name) {
            var _this = this;
            this.subscribe = function (callback) {
                _this.peopleWhoOwnThisStock.push(callback);
            };
            this.unsubscribe = function (name) {
                var index = _this.peopleWhoOwnThisStock.indexOf(name);
                _this.peopleWhoOwnThisStock.splice(index);
            };
            this.setPrice = function (price) {
                _this.price = price;
                for (var i = 0; i < _this.peopleWhoOwnThisStock.length; i++) {
                    _this.peopleWhoOwnThisStock[i].onPriceChange(price);
                }
            };
            this.getPrice = function () {
                return _this.price;
            };
            this.name = name;
            this.peopleWhoOwnThisStock = [];
        }
        Object.defineProperty(Stock.prototype, "Name", {
            get: function () {
                return this.name;
            },
            set: function (value) {
                this.name = value;
            },
            enumerable: true,
            configurable: true
        });
        return Stock;
    })();
    observer.Stock = Stock;
})(observer || (observer = {}));
//# sourceMappingURL=main.js.map