export interface StudentItem {
  name: string;
  surname: string;
  studentId: string;
  profileImage: string;
  courseList: string[];
  teacherId: string;
  comment: string;
  [key: string]: string | string[];
}

export interface TeacherItem {
  name: string;
  surname: string;
  profileImage: string;
  teacherId: string;
  [key: string]: string;
}

export interface ErrorsType {
  name?: string;
  surname?: string;
  studentId?: string;
  courseList?: string;
  teacherId?: string;
  comment?: string;
  image?: string;
  [key: string]: string | undefined; 
}

export interface StudentType {
  name: string;
  surname: string;
  studentId: string;
  courseList: string;
  courseListDisplay?: string;
  teacherId: string;
  comment: string;
  image?: string;
  [key: string]: string | undefined; 
};