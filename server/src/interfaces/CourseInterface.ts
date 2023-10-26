export interface CourseInterface {
  course_id: string;
  course_name: string;
  course_info: string;
  course_picture: string;
  lessons: [
    {
      _id: string;
      lesson_title: string;
      description: string;
      video_url: string;
    },
  ];
}
