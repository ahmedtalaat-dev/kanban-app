import { Column } from "@/types";

export const columnsData : Column[] = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-blue-500',
      backgroundColor: 'bg-blue-100 dark:bg-blue-900',
      cards: [
        { id: '1', title: 'Design new landing page', description: 'Create wireframes and mockups', priority: 'high', backgroundColor: 'bg-blue-100 dark:bg-blue-900' },
        { id: '2', title: 'Update documentation', description: 'Add API endpoints', priority: 'medium', backgroundColor: 'bg-slate-100 dark:bg-slate-800' },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-purple-500',
      backgroundColor: 'bg-purple-100 dark:bg-purple-900',
      cards: [
        { id: '3', title: 'Implement authentication', description: 'OAuth integration', priority: 'high', backgroundColor: 'bg-purple-100 dark:bg-purple-900' },
        { id: '4', title: 'Database optimization', priority: 'medium', backgroundColor: 'bg-slate-100 dark:bg-slate-800' },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-500',
      backgroundColor: 'bg-green-100 dark:bg-green-900',
      cards: [
        { id: '5', title: 'Setup CI/CD pipeline', priority: 'low', backgroundColor: 'bg-green-100 dark:bg-green-900' },
        { id: '6', title: 'Configure monitoring', priority: 'low', backgroundColor: 'bg-slate-100 dark:bg-slate-800' },
      ],
    },
  ]