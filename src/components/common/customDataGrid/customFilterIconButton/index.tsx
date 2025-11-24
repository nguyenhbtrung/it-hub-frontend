import { FilterItem } from '@/types/filter';
import { ColumnHeaderFilterIconButtonProps, useGridApiContext, useGridRootProps } from '@mui/x-data-grid';

export default function CustomFilterIconButton(props: ColumnHeaderFilterIconButtonProps & { filters: FilterItem[] }) {
  const { field, filters } = props;
  const apiRef = useGridApiContext();
  const rootProps = useGridRootProps();

  // Kiểm tra xem có filter nào áp dụng cho cột này không
  const appliedFilters = filters.filter((f) => f.field === field && f.value);
  const isFiltered = appliedFilters.length > 0;

  if (!isFiltered) {
    return null; // ẩn icon nếu cột chưa có filter trong state riêng
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    apiRef.current.showFilterPanel(); // mở panel filter mặc định
  };

  return (
    <rootProps.slots.baseIconButton
      onClick={handleClick}
      size='small'
      color='default'
      {...rootProps.slotProps?.baseIconButton}
    >
      <rootProps.slots.columnFilteredIcon fontSize='inherit' />
    </rootProps.slots.baseIconButton>
  );
}
