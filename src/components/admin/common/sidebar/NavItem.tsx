'use client';

import { useState } from 'react';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, Collapse, List } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { NavItemProps, NavItem as NavItemType } from '@/types/navigation.admin';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function NavItem({ item, open, depth = 0 }: NavItemProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const checkActive = (item: NavItemType, pathname: string): boolean => {
    if (item.href === pathname) return true;
    if (item.children) {
      return item.children.some((child) => checkActive(child, pathname));
    }
    return false;
  };

  const isActive = checkActive(item, pathname);
  const paddingLeft = open ? depth * 3 + 2 : 1.5;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <>
      <ListItem disablePadding sx={{ display: 'block' }}>
        <ListItemButton
          component={hasChildren ? 'div' : Link}
          href={hasChildren ? '#' : item.href}
          onClick={handleClick}
          selected={isActive}
          sx={{
            minHeight: 48,
            justifyContent: open ? 'initial' : 'center',
            px: 2.5,
            pl: paddingLeft,
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {item.icon && <item.icon />}
          </ListItemIcon>
          <ListItemText
            primary={item.label}
            sx={{
              opacity: open ? 1 : 0,
              '& .MuiListItemText-primary': {
                fontSize: depth > 0 ? '0.875rem' : '1rem',
                color: isActive ? 'primary.main' : 'text.primary',
              },
            }}
          />
          {hasChildren && open && (isOpen ? <ExpandLess /> : <ExpandMore />)}
        </ListItemButton>
      </ListItem>

      {hasChildren && open && (
        <Collapse in={isOpen} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            {item.children!.map((child) => (
              <NavItem key={child.href} item={child} open={open} depth={depth + 1} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}
