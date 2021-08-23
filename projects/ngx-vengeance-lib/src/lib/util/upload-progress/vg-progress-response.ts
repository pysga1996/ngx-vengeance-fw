export interface VgProgressResponse {
  type: 'success' | 'danger' | 'info';
  data: string | number;
}
