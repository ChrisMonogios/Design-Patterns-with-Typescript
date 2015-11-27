module factory {
    export class LogFactory {
        constructor() { }

        build = (type: LogEnum): any => {
            if (type === LogEnum.alert) {
                return new AlertLog();
            } else if (type === LogEnum.console) {
                return new ConsoleLog();
            }
        }
    }
}