export interface Todo {
  id: number;
  title: string;
  isCompleted: boolean;
}

export enum Filter {
  All = 1,
  Active,
  Completed
}
