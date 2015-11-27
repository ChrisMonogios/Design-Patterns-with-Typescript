module factory {
    export class ConsoleLog implements ILog {
        constructor() { }

        error = (name: string): void => {
            console.error(name);
        }

        warning = (name: string): void => {
            console.warn(name);
        }

        information = (name: string): void => {
            console.info(name);
        }
    }
}