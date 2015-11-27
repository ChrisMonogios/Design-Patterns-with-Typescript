module factory {
    export interface ILog {
        error(text: string): void;
        warning(text: string): void;
        information(text: string): void;
    }
}