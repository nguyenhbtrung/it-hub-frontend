import { MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import {
  GridColumnMenuProps,
  GridColumnMenu,
  GridColumnMenuItemProps,
  GridFilterAltIcon,
  useGridApiContext,
} from '@mui/x-data-grid';
import { operatorMap } from '@/lib/const/filter';
import { FieldType, FilterItem } from '@/types/filter';

function CustomFilterItem(props: GridColumnMenuItemProps) {
  const { filterItemHandler, filterItemText } = props;
  return (
    <MenuItem onClick={filterItemHandler}>
      <ListItemIcon>
        <GridFilterAltIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>{filterItemText}</ListItemText>
    </MenuItem>
  );
}

interface CustomColumnMenuProps<T> {
  schema: Record<keyof T, FieldType>;
  setFilters: React.Dispatch<React.SetStateAction<FilterItem[]>>;
}

export default function CustomColumnMenu<T>(props: GridColumnMenuProps & CustomColumnMenuProps<T>) {
  const { schema, setFilters, ...gridColumnMenuProps } = props;
  const apiRef = useGridApiContext();
  const handleFilterItemClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const field = props.colDef?.field;
    const type = schema[field as keyof T];
    const operators = operatorMap[type] ?? [];
    setFilters((prev) => {
      const exists = prev.some((f) => f.field === field);
      if (exists) return prev;

      return [...prev, { field: field, operator: operators[0], value: '' }];
    });

    apiRef.current.showFilterPanel();
  };
  return (
    <GridColumnMenu
      {...gridColumnMenuProps}
      slots={{
        columnMenuFilterItem: CustomFilterItem,
      }}
      slotProps={{
        columnMenuFilterItem: {
          filterItemText: 'Bộ lọc',
          filterItemHandler: handleFilterItemClick,
        },
      }}
    />
  );
}
