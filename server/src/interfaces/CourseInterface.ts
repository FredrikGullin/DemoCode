export interface CourseInterface {
  course_id: number;
  course_name: string;
  course_info: string;
  course_picture: string;
  lessons: {
    lesson_id: number;
    lesson_title: string;
    lesson_description: {
      description_id: number;
      text: string;
    };
    lesson_video: {
      video_id: number;
      video_url: string;
    };
  };
}
