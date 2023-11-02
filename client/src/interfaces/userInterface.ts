export interface UserInterface {
  user_id?: string;
  username: string;
  email: string;
  password: string;
  role: string;
  owned_courses: {
    course_id: string;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
}
