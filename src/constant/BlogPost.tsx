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
  identifier?: string;
  content_heading?: string;
  creation_time?: string;
  filtered_content?: string;
  short_content?: string;
}