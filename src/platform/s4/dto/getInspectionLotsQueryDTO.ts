import {
  IsNotEmpty,
  IsString,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from "class-validator";
import { ParsedQs } from "qs";

const IsXOrNull =
  (validationOptions: ValidationOptions) =>
  (object: object, propertyName: string): void => {
    registerDecorator({
      name: "isXOrNull",
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(value: string | null) {
          return value === "'X'" || value === "null";
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be only 'X' or null`;
        },
      },
    });
  };

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

const IsDateFormat = (): ((object: object, propertyName: string) => void) => {
  return (object: object, propertyName: string) => {
    registerDecorator({
      name: "isDateFormat",
      target: object.constructor,
      propertyName: propertyName,
      validator: {
        validate(value: string) {
          return dateRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be in the format yyyy-mm-dd`;
        },
      },
    });
  };
};

export class GetInspectionLotsQueryDTO {
  @IsDateFormat()
  startDate: string;

  @IsDateFormat()
  endDate: string;

  @IsNotEmpty()
  @IsString()
  @IsXOrNull({
    message:
      "isInspectionCompleted accepts only 'X' meaning true or null meaning false",
  })
  isInspectionCompleted: string | null;

  constructor(query: ParsedQs) {
    this.startDate = query.startDate as string;
    this.endDate = query.endDate as string;
    this.isInspectionCompleted = query.isInspectionCompleted as string;
  }
}
