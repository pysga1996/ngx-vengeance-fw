export interface VgProgressResponse {
  type: 'success' | 'danger' | 'info';
  // eslint-disable-next-line
  data: any;
  progress: number;
}
