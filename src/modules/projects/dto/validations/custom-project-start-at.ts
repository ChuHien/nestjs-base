import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class CustomProjectStartAt implements ValidatorConstraintInterface {
  validate(startAt: Date) {
    return startAt.valueOf() > Date.now();
  }
  defaultMessage() {
    return 'projectStartedAt must be greater than current time';
  }
}
