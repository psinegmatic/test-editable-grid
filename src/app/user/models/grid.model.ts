export interface GridPagination {
  page?: number;
  per_page?: number;
  total?: number;
  total_pages?: number;
}

export interface GridColumnsConfig {
  columnDef: string;
  header: string;
  editable: boolean;
  cell: ( element: any) => string;
}
