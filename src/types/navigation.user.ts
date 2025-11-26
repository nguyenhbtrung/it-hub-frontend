export interface NavItem {
  label: string;
  href?: string;
  submenu?: NavItem[];
  menuType?: 'small' | 'mega';
}
