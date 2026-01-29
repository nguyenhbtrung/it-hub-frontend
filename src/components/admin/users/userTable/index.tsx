'use client';

import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { Avatar, Box, Chip, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useEffect, useState } from 'react';
import { toLocaleDateString } from '@/lib/utils/formatDatetime';
import { useRouter, useSearchParams } from 'next/navigation';
import DataGridToolbar from '@/components/common/customDataGrid/dataGridToolbar';
import CustomFilterIconButton from '@/components/common/customDataGrid/customFilterIconButton';
import CustomFilterPanel from '@/components/common/customDataGrid/customFilterPanel';
import { FieldType, FilterItem } from '@/types/filter';
import CustomColumnMenu from '@/components/common/customDataGrid/customColumnMenu';
import { getDefaultFilter } from '@/lib/utils/filter';
import { useMounted } from '@/hooks/useMounted';
import { useNotification } from '@/contexts/notificationContext';
import { getUsers } from '@/services/user.service';
import { roleLabelsMap } from '@/lib/const/user';
import UpdateUserDialog from '../dialogs/updateUser';
import { getRoleColor } from '@/lib/utils/userBadge';

interface User {
  id: number;
  avatarUrl: string;
  name: string;
  email: string;
  role: string;
  scope: string;
  status: string;
  createdAt: string;
}

const userSchema: Record<keyof User, FieldType> = {
  id: 'number',
  avatarUrl: 'string',
  name: 'string',
  email: 'string',
  role: 'string',
  scope: 'string',
  status: 'string',
  createdAt: 'string',
};

const userFieldsMap: Record<keyof User, string> = {
  id: 'ID',
  avatarUrl: 'Ảnh đại diện',
  name: 'Họ tên',
  email: 'Email',
  role: 'Vai trò',
  scope: 'Phạm vi',
  status: 'Trạng thái',
  createdAt: 'Ngày tạo',
};

export default function UserTable({ reloadKey }: { reloadKey: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Lấy tham số từ URL
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

  const [data, setData] = useState<User[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

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
    initFilters.length > 0 ? initFilters : [getDefaultFilter<User>(userSchema)]
  );

  const isMounted = useMounted();
  const { notify } = useNotification();

  const handleOpenEdit = (user: User) => {
    setSelectedUserId(String(user.id));
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setSelectedUserId(null);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const sortField = sortModel[0]?.field;
        const sortOrder = sortModel[0]?.sort || 'asc';
        const search = filterModel.quickFilterValues?.join(' ');

        const res = await getUsers({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          sortBy: sortField,
          sortOrder,
          q: search ? search : undefined,
        });

        // const response = await fakeApi.getUsers(
        //   paginationModel.page + 1,
        //   paginationModel.pageSize,
        //   sortField,
        //   sortOrder,
        //   search,
        //   filters
        // );

        setData(res?.data || []);
        setTotal(res?.meta?.total || 0);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isMounted) {
      fetchUsers();
    }
  }, [paginationModel, sortModel, filterModel, filters, isMounted, reloadKey]);

  useEffect(() => {
    if (!isMounted) return;

    const updateURL = () => {
      const params = new URLSearchParams();

      params.set('page', (paginationModel.page + 1).toString());
      params.set('pageSize', paginationModel.pageSize.toString());

      if (sortModel[0]?.field) {
        params.set('sortBy', sortModel[0].field);
        params.set('sortOrder', sortModel[0].sort || 'asc');
      }

      if (filterModel.quickFilterValues && filterModel.quickFilterValues.length > 0) {
        params.set('q', filterModel.quickFilterValues.join(' '));
      }

      filters.forEach((f) => {
        if (f.value) {
          const key = f.operator === 'eq' ? f.field : `${f.field}_${f.operator}`;
          params.set(key, f.value);
        }
      });

      router.replace(`?${params.toString()}`);
    };

    updateURL();
  }, [paginationModel, sortModel, filterModel, filters, isMounted, router]);

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'avatarUrl',
      headerName: 'Ảnh',
      width: 70,
      sortable: false,
      renderCell: (params) => {
        const url = params.value;

        return (
          <Box height='100%' display='flex' justifyContent='center' alignItems='center'>
            <Avatar alt='Remy Sharp' src={url} />
          </Box>
        );
      },
    },
    {
      field: 'fullname',
      headerName: 'Họ tên',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 200,
    },
    {
      field: 'role',
      headerName: 'Vai trò',
      width: 130,
      renderCell: (params) => {
        const role = params.value;

        return <Chip label={roleLabelsMap[role]} size='small' sx={getRoleColor(role)} />;
      },
    },
    // {
    //   field: 'scope',
    //   headerName: 'Phạm vi',
    //   width: 130,
    //   renderCell: (params) => {
    //     const scope = params.value;
    //     const colors: any = {
    //       internal: 'primary',
    //       external: 'warning',
    //     };

    //     return <Chip label={scope} color={colors[scope] || 'default'} size='small' />;
    //   },
    // },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 130,
      renderCell: (params) => (
        <Chip
          label={params.value === 'active' ? 'Hoạt động' : 'Đình chỉ'}
          // color={params.value === 'active' ? 'success' : 'error'}
          sx={{
            color: params.value === 'active' ? 'success.main' : 'error.main',
            bgcolor: params.value === 'active' ? 'success.light' : 'error.light',
          }}
          size='small'
        />
      ),
    },
    {
      field: 'createdAt',
      headerName: 'Ngày tạo',
      width: 120,
      valueGetter: (value: any) => toLocaleDateString(new Date(value)),
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title='Xem'>
            <IconButton>
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title='Chỉnh sửa'>
            <IconButton onClick={() => handleOpenEdit(params.row)}>
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
    <>
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
          filterPanel: CustomFilterPanel<User>,
          columnMenu: (props) => <CustomColumnMenu<User> {...props} schema={userSchema} setFilters={setFilters} />,
        }}
        slotProps={{
          filterPanel: {
            schema: userSchema,
            fieldsMap: userFieldsMap,
            filters: filters,
            setFilters: setFilters,
          },
        }}
      />
      <UpdateUserDialog
        open={openEdit}
        userId={selectedUserId}
        onClose={handleCloseEdit}
        onSuccess={() => {
          setPaginationModel((prev) => ({ ...prev }));
          // router.refresh();
        }}
      />
    </>
  );
}
