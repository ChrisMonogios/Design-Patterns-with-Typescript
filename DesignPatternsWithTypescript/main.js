var adapter;
(function (adapter) {
    var ExternalSoftware = (function () {
        function ExternalSoftware() {
            this.method1 = function () {
            };
            this.method2 = function (param) {
            };
            this.method3 = function (param, param2) {
                return "";
            };
            this.method4 = function (param) {
                return 1;
            };
        }
        return ExternalSoftware;
    })();
    adapter.ExternalSoftware = ExternalSoftware;
})(adapter || (adapter = {}));
var adapter;
(function (adapter) {
    var ExternalSoftwareAdapter = (function () {
        function ExternalSoftwareAdapter() {
            var _this = this;
            this.simpleMethod1 = function () {
                _this.externalSoftware.method1();
                _this.externalSoftware.method2("");
            };
            this.simpleMethod2 = function (param, param2) {
                _this.externalSoftware.method3(1, "");
                _this.externalSoftware.method4(1);
                _this.externalSoftware.method1();
            };
            this.externalSoftware = new adapter.ExternalSoftware();
        }
        return ExternalSoftwareAdapter;
    })();
    adapter.ExternalSoftwareAdapter = ExternalSoftwareAdapter;
})(adapter || (adapter = {}));
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
var factory;
(function (factory) {
    (function (LogEnum) {
        LogEnum[LogEnum["alert"] = 0] = "alert";
        LogEnum[LogEnum["console"] = 1] = "console";
    })(factory.LogEnum || (factory.LogEnum = {}));
    var LogEnum = factory.LogEnum;
})(factory || (factory = {}));
var singleton;
(function (singleton) {
    var SingletonFactory = (function () {
        function SingletonFactory() {
            this.getInstance = function () {
                if (!SingletonFactory.instance) {
                    SingletonFactory.instance = new SingletonFactory();
                }
                return SingletonFactory.instance;
            };
            if (SingletonFactory.instance) {
                return SingletonFactory.instance;
            }
            SingletonFactory.instance = this;
        }
        return SingletonFactory;
    })();
    singleton.SingletonFactory = SingletonFactory;
})(singleton || (singleton = {}));
/// <reference path="ChainOfResponsibility/ValidationResolver.ts" />
/// <reference path="Observer/Customer.ts" />
/// <reference path="Observer/Stock.ts" />
/// <reference path="Factory/LogFactory" />
/// <reference path="Factory/LogEnum" />
/// <reference path="Singleton/SingletonFactory" />
/// <reference path="Adapter/ExternalSoftwareAdapter.ts" />
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
    // Singleton:
    var sing = new singleton.SingletonFactory();
    var secVariable = sing.getInstance();
    //Adapter
    var adapt = new adapter.ExternalSoftwareAdapter();
    adapt.simpleMethod1();
    adapt.simpleMethod2("", 1);
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
//# sourceMappingURL=main.js.map