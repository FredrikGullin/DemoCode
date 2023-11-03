export interface AuthStateInterface {
  accessToken: string | null;
  userId?: string;
  username?: string;
  email?: string;
  role?: string;
  owned_courses?: string[];
}
