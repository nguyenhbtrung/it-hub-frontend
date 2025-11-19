import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export interface NavItem {
  label: string;
  icon?: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string };
  href?: string;
  children?: NavItem[];
}

export interface NavItemProps {
  item: NavItem;
  open: boolean;
  depth?: number;
}

export interface SidebarProps {
  open: boolean;
  onClose: () => void;
  isMobile: boolean;
}

export interface TopBarProps {
  onMenuClick: () => void;
}
