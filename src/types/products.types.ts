export interface Category {
  img: string;
  alt: string;
  text: string;
}

// 2. Component props
export interface DashboardProps {
  filterEnabled: boolean;
  searchQuery?: string;
  handleItemClick?: () => void;
}
