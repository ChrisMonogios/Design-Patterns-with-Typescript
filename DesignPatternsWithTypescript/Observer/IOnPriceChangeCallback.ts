module observer {
    export interface IOnPriceChangeCallback {
        (sell: boolean): void;
    }
}