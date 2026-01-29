'use client';

import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { Avatar, Box, IconButton, Tooltip } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/VisibilityOutlined';
import CancelOutlined from '@mui/icons-material/CancelOutlined';
import CheckCircleOutline from '@mui/icons-material/CheckCircleOutline';
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
import { getInstructorRegistrations, updateUser } from '@/services/user.service';
import { useNotification } from '@/contexts/notificationContext';

interface InstructorRegistration {
  id: number;
  avatarUrl: string;
  name: string;
  email: string;
  createdAt: string;
}

const instructorRegistrationSchema: Record<keyof InstructorRegistration, FieldType> = {
  id: 'number',
  avatarUrl: 'string',
  name: 'string',
  email: 'string',
  createdAt: 'string',
};

const instructorRegistrationFieldsMap: Record<keyof InstructorRegistration, string> = {
  id: 'ID',
  avatarUrl: 'Ảnh đại diện',
  name: 'Họ tên',
  email: 'Email',
  createdAt: 'Ngày đăng ký',
};

export default function InstructorRegistrationTable() {
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

  const [data, setData] = useState([]);
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
    initFilters.length > 0 ? initFilters : [getDefaultFilter<InstructorRegistration>(instructorRegistrationSchema)]
  );
  const isMounted = useMounted();
  const { notify } = useNotification();

  const handleAccept = async (userId: string) => {
    try {
      const res = await updateUser(userId, { role: 'instructor' });
      if (!res?.success) throw new Error('Chấp thuận thất bại, vui lòng thử lại');
      setPaginationModel((prev) => ({ ...prev }));
    } catch (error: any) {
      notify('error', error?.message || 'Chấp thuận thất bại, vui lòng thử lại', {
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

  const handleReject = async (userId: string) => {
    try {
      const res = await updateUser(userId, { instructorApplicationAt: null });
      if (!res?.success) throw new Error('Từ chối thất bại, vui lòng thử lại');
      setPaginationModel((prev) => ({ ...prev }));
    } catch (error: any) {
      notify('error', error?.message || 'Từ chối thất bại, vui lòng thử lại', {
        vertical: 'top',
        horizontal: 'right',
      });
    }
  };

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const sortField = sortModel[0]?.field;
        const sortOrder = sortModel[0]?.sort || 'asc';
        const search = filterModel.quickFilterValues?.join(' ');

        const res = await getInstructorRegistrations({
          page: paginationModel.page + 1,
          limit: paginationModel.pageSize,
          sortBy: sortField,
          sortOrder,
          q: search ? search : undefined,
        });

        setData(res?.data || []);
        setTotal(res?.meta?.total || 0);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isMounted) {
      fetchRegistrations();
    }
  }, [paginationModel, sortModel, filterModel, filters, isMounted]);

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
      field: 'instructorApplicationAt',
      headerName: 'Ngày đăng ký',
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
          <Tooltip title='Chấp nhận'>
            <IconButton color='success' onClick={() => handleAccept(params.row.id || '')}>
              <CheckCircleOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='Từ chối' onClick={() => handleReject(params.row.id || '')}>
            <IconButton color='error'>
              <CancelOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem'>
            <IconButton>
              <VisibilityIcon />
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
        filterPanel: CustomFilterPanel<InstructorRegistration>,
        columnMenu: (props) => (
          <CustomColumnMenu<InstructorRegistration>
            {...props}
            schema={instructorRegistrationSchema}
            setFilters={setFilters}
          />
        ),
      }}
      slotProps={{
        filterPanel: {
          schema: instructorRegistrationSchema,
          fieldsMap: instructorRegistrationFieldsMap,
          filters: filters,
          setFilters: setFilters,
        },
      }}
    />
  );
}
