export interface LearningPath {
    id: number;
    title: string;
    assignedTo: string;
    description: string;
    acceptanceCriteria: string | null;
    changedDate: Date;
  }