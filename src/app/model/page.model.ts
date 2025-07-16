export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;  // pagina corrente (zero-based)
  first: boolean;
  last: boolean;
}