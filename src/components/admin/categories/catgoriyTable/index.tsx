'use client';

import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { Box, Chip, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import DataGridToolbar from '@/components/common/customDataGrid/dataGridToolbar';
import CustomFilterIconButton from '@/components/common/customDataGrid/customFilterIconButton';
import CustomFilterPanel from '@/components/common/customDataGrid/customFilterPanel';
import CustomColumnMenu from '@/components/common/customDataGrid/customColumnMenu';

import { FieldType, FilterItem } from '@/types/filter';
import { getDefaultFilter } from '@/lib/utils/filter';
import { useMounted } from '@/hooks/useMounted';
import { useNotification } from '@/contexts/notificationContext';

import { getCategories } from '@/services/category.service';

interface Category {
  id: string;
  parentId: string | null;
  name: string;
  slug: string;
  description: string;
}

const categorySchema: Record<keyof Category, FieldType> = {
  id: 'string',
  parentId: 'string',
  name: 'string',
  slug: 'string',
  description: 'string',
};

const categoryFieldsMap: Record<keyof Category, string> = {
  id: 'ID',
  parentId: 'Danh mục cha',
  name: 'Tên danh mục',
  slug: 'Slug',
  description: 'Mô tả',
};

export default function CategoryTable({ reloadKey }: { reloadKey: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('pageSize')) || 10;
  const sortField = searchParams.get('sortBy') || null;
  const sortOrder = (searchParams.get('sortOrder') as 'asc' | 'desc') || null;
  const search = searchParams.get('q') || '';

  const initFilters: FilterItem[] = [];
  searchParams.forEach((val, key) => {
    if (['page', 'pageSize', 'sortBy', 'sortOrder', 'q'].includes(key)) return;

    const parts = key.split('_');
    if (parts.length === 2) {
      const [field, operator] = parts;
      initFilters.push({ field, operator, value: val });
    }
  });

  const [data, setData] = useState<Category[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: page - 1,
    pageSize,
  });

  const [sortModel, setSortModel] = useState<GridSortModel>(
    sortField && sortOrder ? [{ field: sortField, sort: sortOrder }] : []
  );

  const [filterModel, setFilterModel] = useState<GridFilterModel>({
    items: [],
    quickFilterValues: search ? [search] : [],
  });

  const [filters, setFilters] = useState<FilterItem[]>(
    initFilters.length > 0 ? initFilters : [getDefaultFilter<Category>(categorySchema)]
  );

  const isMounted = useMounted();
  const { notify } = useNotification();

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);

      try {
        const sortField = sortModel[0]?.field;
        const sortOrder = sortModel[0]?.sort || 'asc';
        const search = filterModel.quickFilterValues?.join(' ');

        const res = await getCategories({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          sortBy: sortField,
          sortOrder,
          q: search ? search : undefined,
        });

        setData(res?.data || []);
        setTotal(res?.meta?.total || 0);
      } catch (error) {
        console.error('Lỗi khi tải danh mục:', error);
        // notify('Không thể tải danh mục', 'error');
      } finally {
        setLoading(false);
      }
    };

    if (isMounted) {
      fetchCategories();
    }
  }, [paginationModel, sortModel, filterModel, filters, reloadKey, isMounted]);

  useEffect(() => {
    if (!isMounted) return;

    const params = new URLSearchParams();

    params.set('page', (paginationModel.page + 1).toString());
    params.set('pageSize', paginationModel.pageSize.toString());

    if (sortModel[0]?.field) {
      params.set('sortBy', sortModel[0].field);
      params.set('sortOrder', sortModel[0].sort || 'asc');
    }

    if (filterModel.quickFilterValues?.length) {
      params.set('q', filterModel.quickFilterValues.join(' '));
    }

    filters.forEach((f) => {
      if (f.value) {
        const key = f.operator === 'eq' ? f.field : `${f.field}_${f.operator}`;
        params.set(key, f.value);
      }
    });

    router.replace(`?${params.toString()}`);
  }, [paginationModel, sortModel, filterModel, filters, isMounted]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Tên danh mục',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'slug',
      headerName: 'Slug',
      flex: 1,
      minWidth: 180,
    },
    {
      field: 'parentId',
      headerName: 'Danh mục cha',
      width: 180,
      renderCell: (params) =>
        params.value ? <Chip label={params.value} size='small' /> : <Chip label='Root' size='small' />,
    },
    {
      field: 'description',
      headerName: 'Mô tả',
      flex: 2,
      minWidth: 250,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Box>
          <Tooltip title='Xem'>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Chỉnh sửa'>
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Xóa'>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
    },
  ];

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  return (
    <DataGrid
      rows={data}
      columns={columns}
      paginationMode='server'
      sortingMode='server'
      filterMode='server'
      rowCount={total}
      loading={loading}
      pageSizeOptions={[5, 10, 20, 50]}
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      sortModel={sortModel}
      onSortModelChange={setSortModel}
      filterModel={filterModel}
      onFilterModelChange={setFilterModel}
      checkboxSelection
      disableRowSelectionOnClick
      showToolbar
      slots={{
        toolbar: DataGridToolbar,
        columnHeaderFilterIconButton: (props) => <CustomFilterIconButton {...props} filters={filters} />,
        filterPanel: CustomFilterPanel<Category>,
        columnMenu: (props) => (
          <CustomColumnMenu<Category> {...props} schema={categorySchema} setFilters={setFilters} />
        ),
      }}
      slotProps={{
        filterPanel: {
          schema: categorySchema,
          fieldsMap: categoryFieldsMap,
          filters,
          setFilters,
        },
      }}
    />
  );
}
