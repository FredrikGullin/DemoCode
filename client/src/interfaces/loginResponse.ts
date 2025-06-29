export interface LoginResponseInterface {
  accessToken: string;
  userId: string;
  username: string;
  email: string;
  role: string;
  owned_courses: string[];
}
