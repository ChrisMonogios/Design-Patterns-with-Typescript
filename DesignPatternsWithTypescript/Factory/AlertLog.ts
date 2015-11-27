module factory {
    export class AlertLog implements ILog {
        constructor() { }

        error = (name: string): void => {
            alert(name);
        }

        warning = (name: string): void => {
            alert(name);
        }

        information = (name: string): void => {
            alert(name);
        }
    }
}