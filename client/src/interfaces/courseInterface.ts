export interface CourseInterface {
  _id: string;
  course_name: string;
  course_slogan: string;
  course_info: string;
  course_price: string;
  course_picture: string;
  lessons: [
    {
      _id: string;
      lesson_title: string;
      description: string;
      video_url: string;
    }
  ];
}
