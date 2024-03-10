export interface Task {
  id: String | string;
  title: String | string;
  createdAt: Date;
  expires: Date;
  color: string;
}

export interface FirebaseDate {
  _seconds: number;
  _nanoseconds: number;
}
