export interface Todo {
  id: string;
  title: string;
  priority: Priority;
  description: string;
  done: boolean;
  created?: number;
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
