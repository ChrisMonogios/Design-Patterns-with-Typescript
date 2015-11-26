/// <element path="ValidationResolver.ts">
/// <element path="Customer.ts">
/// <element path="Stock.ts">

window.onload = () => {

    // Chain of responsibility:
    var resolver = new validators.ValidationResolver();
    var example1 = resolver.resolveValidation("test");
    console.log(example1);

    var example2 = resolver.resolveValidation(2);
    console.log(example2);

    // Observer
    var customer1 = new observer.Customer("Christos Monogios");
    var customer2 = new observer.Customer("John Doe");

    customer1.onPriceChange = function () { console.log("do not sell!") };
    customer2.onPriceChange = function () { console.log("sell now!") };

    var stock1 = new observer.Stock("oil company");
    stock1.subscribe(customer1.onPriceChange);
    stock1.subscribe(customer2.onPriceChange);

    stock1.setPrice(19);
};