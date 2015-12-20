module adapter {
    export class ExternalSoftwareAdapter implements SimpleExternalSoftware {
        private externalSoftware: ExternalSoftware;

        constructor() {
            this.externalSoftware = new ExternalSoftware();
        }

        simpleMethod1 = (): void => {
            this.externalSoftware.method1();
            this.externalSoftware.method2("");
        }

        simpleMethod2 = (param: string, param2: number): void => {
            this.externalSoftware.method3(1, "");
            this.externalSoftware.method4(1);
            this.externalSoftware.method1();
        }
    }
}
