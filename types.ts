export interface Script {
  id: string;
  title: string;
  description: string;
  note?: string;
  shortlink: string;
  views: number;
  clicks: number;
  searches: number; // For internal tracking
  createdAt: number; // Timestamp
}

export type SortOption = 'newest' | 'popular' | 'searched';

export interface AnalyticsSummary {
  totalViews: number;
  totalClicks: number;
  totalScripts: number;
}

export interface ChartDataPoint {
  name: string;
  value: number;
}
