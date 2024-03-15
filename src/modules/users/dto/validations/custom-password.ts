import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customPassword', async: false })
export class CustomPassword implements ValidatorConstraintInterface {
  validate(password: string) {
    const regexp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
    return (
      password.length >= 8 &&
      password.length <= 20 &&
      regexp.test(password) &&
      regexp.test(password)
    );
  }

  defaultMessage() {
    return 'The password must have 8 - 20 characters, and must contain both uppercase, lowercase letters, and numbers';
  }
}
