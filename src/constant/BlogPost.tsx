export interface BlogPost {
  post_id: string;
  title: string;
  post_url: string;
  publish_time: string;
  featured_image: string;
  author?: {
    name: string;
    author_url: string;
  };
  author_name?: string; 
  author_url?: string;
}