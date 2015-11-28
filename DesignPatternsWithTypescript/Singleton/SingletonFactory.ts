module singleton {
    export class SingletonFactory {
        static instance: SingletonFactory;

        constructor() {
            if (SingletonFactory.instance) {
                return SingletonFactory.instance;
            }

            SingletonFactory.instance = this;
        }

        getInstance = (): SingletonFactory => {
            if (!SingletonFactory.instance) {
                SingletonFactory.instance = new SingletonFactory();
            }

            return SingletonFactory.instance;
        }
    }
}