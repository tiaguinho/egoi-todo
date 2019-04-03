export interface Todo {
  id: number;
  title: string;
  priority: Priority;
  description: string;
  done: boolean;
}

interface Priority {
  type: string;
  text: string;
  color?: string;
}

export const priorities: Priority[] = [
  { type: 'critical', text: 'Critical', color: 'red' },
  { type: 'medium', text: 'Medium', color: 'yellow' },
  { type: 'low', text: 'Low' },
];
