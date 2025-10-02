export interface RoadmapNodeData {
  id?: string; // Unique identifier for each node
  name: string;
  details: string;
  category?: string;
  imageUrl?: string; // URL for a custom icon/image
  // FIX: Add 'customColor' to allow for custom node styling, resolving type errors in multiple components.
  customColor?: {
    light: string;
    dark: string;
  };
  children?: RoadmapNodeData[];
  progress?: {
    isCompleted: boolean;
    completionDate?: string;
    sprintId?: string;
  };
}
