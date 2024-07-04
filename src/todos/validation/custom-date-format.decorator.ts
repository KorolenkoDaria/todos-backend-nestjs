import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsCustomDateFormat(format: string, validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isCustomDateFormat',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const regex = /^\d{2}-\d{2}-\d{4}$/;
                    if (!regex.test(value)) {
                        return false;
                    }

                    const [day, month, year] = value.split('-').map(Number);
                    const date = new Date(year, month - 1, day);
                    return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
                },
                defaultMessage(args: ValidationArguments) {
                    return `$property must be a valid date in the format ${format}`;
                },
            },
        });
    };
}
