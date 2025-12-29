export interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description?: string | null;
}
