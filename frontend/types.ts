export type ProjectCategory = 'Residential' | 'Commercial' | 'Hospitality' | 'Public' | 'Urban Design' | 'Renovation';

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  client: string;
  scope: string;
  description: string;
  imageUrl?: string;   
  images: string[];
  featured: boolean;
};

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export interface Statistic {
  label: string;
  value: string;
  suffix?: string;
}