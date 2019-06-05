export function lazyVal(): any {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
        // console.log(target);
        // console.log(propertyKey);
        // console.log(descriptor);
        const propertyValue = propertyKey + 'Value';
        const propertyIsEvaluated = propertyKey + 'IsEvaluated';
        Object.defineProperty(target, propertyValue, {
            value: null,
            writable: true,
            enumerable: false,
            configurable: false
        });
        Object.defineProperty(target, propertyIsEvaluated, {
            value: false,
            writable: true,
            enumerable: false,
            configurable: false
        });

        const propertyFunction = descriptor.value;

        descriptor.value = (...args: any[]) => {
            if (target[propertyIsEvaluated] === false) {
                target[propertyValue] = propertyFunction(...args);
                target[propertyIsEvaluated] = true;
            }
            return target[propertyValue];
        };
    }
}