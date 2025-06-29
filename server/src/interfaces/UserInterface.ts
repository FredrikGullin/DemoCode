export interface UserInterface {
  user_id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  owned_courses: Array<
    [
      {
        course_id: string;
      },
    ]
  >;
}
