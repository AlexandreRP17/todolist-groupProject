import { Timestamp } from "rxjs";

export interface Task {
    id?: string;
    title: string;
    description: string;
    user: string;
    dateToComplete: Date;
  }