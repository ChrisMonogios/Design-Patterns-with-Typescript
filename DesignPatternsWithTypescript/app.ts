/// <element path="ValidationResolver.ts"

window.onload = () => {
    var resolver = new validators.ValidationResolver();
    var result = resolver.resolveValidation("test");
    console.log(result);
};