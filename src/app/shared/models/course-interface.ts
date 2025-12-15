import { schema, required } from '@angular/forms/signals';


export interface Course {
  id?: number;
  title: string;
  instructor: string;
  path: string;
  source: string;
}

export interface CourseChartData {
  name: string;
  value: number;
}

export const COURSE_EDIT_SCHEMA = schema<Course>((schemaPath) => {
  required(schemaPath.title, {message: 'Please enter title of course'});
  required(schemaPath.instructor, {message:  'Please enter instructor of course'});
  required(schemaPath.path, {message:  'Please select path of course'});
  required(schemaPath.source, { message: 'Please select source of course' });
})
