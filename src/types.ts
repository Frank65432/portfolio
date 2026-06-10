export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  imageUrl?: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  viewCount: string;
  publishedAt: string;
  thumbnailUrl: string;
  category: "Code" | "Lifestyle" | "Tech Review";
  url: string;
  duration: string;
}

export interface ClothingItem {
  id: string;
  name: string;
  price: number;
  category: "Hoodies" | "Tees" | "Accessories";
  description: string;
  imageUrl: string;
  sizes: string[];
  inStock: boolean;
}

export interface DigitalCreation {
  id: string;
  title: string;
  type: "Web Art" | "Typography" | "Interactive" | "Design Mock";
  description: string;
  previewUrl?: string;
  colorHex: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  text: string;
  timestamp: Date;
}
