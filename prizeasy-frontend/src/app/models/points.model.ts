export interface PointsRequest {
  email: string;
  points: number;
  description: string;
}

export interface PointsHistory {
  points: number;
  type: string;
  description: string;
  createdAt: string;
  userEmail?: string;
}
