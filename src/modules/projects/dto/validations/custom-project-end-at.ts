import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CustomProjectEndAt implements ValidatorConstraintInterface {
  validate(endAt: Date, args: ValidationArguments) {
    return endAt > args.object['projectStartedAt'];
  }

  defaultMessage() {
    return 'projectEndedAt must be greater than projectStartedAt';
  }
}
