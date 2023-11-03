export interface UserInterface {
  userId?: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  owned_courses: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
