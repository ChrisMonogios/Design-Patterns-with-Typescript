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
    var stock1 = new observer.Stock("oil company");

    customer1.buyStock(stock1, 150);
    customer2.buyStock(stock1, 10);
    
    stock1.subscribe(customer1);
    stock1.subscribe(customer2);

    stock1.setPrice(19);
    stock1.setPrice(200);
};