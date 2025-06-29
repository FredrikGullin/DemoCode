export interface UpdateUserInterface {
  accessToken: string;
  userId: string;
  username?: string;
  email?: string;
  password?: string;
  role: string;
  owned_courses?: Array<
    [
      {
        course_id: string;
      },
    ]
  >;
}
