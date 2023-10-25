export interface UserInterface {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  courses: {
    course_id: string;
  };
}
