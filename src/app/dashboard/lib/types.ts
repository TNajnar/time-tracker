export type TTrackedJob = {
  description: string;
  elapsedTime: string; // Total time spent on the job in hh:mm:ss format
  endTime?: Date;
  id: string;
  isActive: boolean;
  projectType?: TProject;
  startTime: Date;
};

export type TProject = {
  id: string;
  name: string;
};
