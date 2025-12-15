import { email, required, schema } from '@angular/forms/signals';

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

export const USER_EDIT_SCHEMA = schema<User>((schemaPath) => {
  required(schemaPath.name, { message: 'Please enter user name' });
  required(schemaPath.email, { message: 'Please enter email address' });
  email(schemaPath.email, { message: 'Please enter valid email address' });
  required(schemaPath.role, { message: 'Please select user role' });
});
