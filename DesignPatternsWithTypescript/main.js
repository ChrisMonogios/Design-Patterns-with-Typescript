/// <element path="ValidationResolver.ts">
/// <element path="Customer.ts">
/// <element path="Stock.ts">
/// <elemnt path="LogFactory">
/// <element path="LogEnum">
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
    // Factory:
    var log = new factory.LogFactory().build(factory.LogEnum.console);
    log.error("an error just happened!");
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
var factory;
(function (factory) {
    var AlertLog = (function () {
        function AlertLog() {
            this.error = function (name) {
                alert(name);
            };
            this.warning = function (name) {
                alert(name);
            };
            this.information = function (name) {
                alert(name);
            };
        }
        return AlertLog;
    })();
    factory.AlertLog = AlertLog;
})(factory || (factory = {}));
var factory;
(function (factory) {
    var ConsoleLog = (function () {
        function ConsoleLog() {
            this.error = function (name) {
                console.error(name);
            };
            this.warning = function (name) {
                console.warn(name);
            };
            this.information = function (name) {
                console.info(name);
            };
        }
        return ConsoleLog;
    })();
    factory.ConsoleLog = ConsoleLog;
})(factory || (factory = {}));
var factory;
(function (factory) {
    (function (LogEnum) {
        LogEnum[LogEnum["alert"] = 0] = "alert";
        LogEnum[LogEnum["console"] = 1] = "console";
    })(factory.LogEnum || (factory.LogEnum = {}));
    var LogEnum = factory.LogEnum;
})(factory || (factory = {}));
var factory;
(function (factory) {
    var LogFactory = (function () {
        function LogFactory() {
            this.build = function (type) {
                if (type === factory.LogEnum.alert) {
                    return new factory.AlertLog();
                }
                else if (type === factory.LogEnum.console) {
                    return new factory.ConsoleLog();
                }
            };
        }
        return LogFactory;
    })();
    factory.LogFactory = LogFactory;
})(factory || (factory = {}));
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