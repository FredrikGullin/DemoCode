export interface UserInterface {
  _id: string;
  userId?: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  owned_courses: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
