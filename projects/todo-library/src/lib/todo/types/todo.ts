export interface Todo {
  id: number;
  userId?: number;
  title: string;
  completed: boolean;
}

export enum Filter {
  All = 1,
  Active,
  Completed
}
