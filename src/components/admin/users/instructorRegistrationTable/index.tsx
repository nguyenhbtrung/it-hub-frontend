'use client';

import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { Avatar, Box, Chip, IconButton, Tooltip } from '@mui/material';
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

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateRandomName(): string {
  const lastNames = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Vũ'];
  const middleNames = ['Văn', 'Thị', 'Hữu', 'Đức', 'Minh', 'Thanh'];
  const firstNames = ['An', 'Bình', 'Chi', 'Dũng', 'Lan', 'Mai', 'Phong', 'Quang'];

  const lastName = getRandomElement(lastNames);
  const middleName = getRandomElement(middleNames);
  const firstName = getRandomElement(firstNames);

  return `${lastName} ${middleName} ${firstName}`;
}

function nameToEmail(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '');
}

function getRandomRole(): string {
  const roles = ['admin', 'instructor', 'student'];
  return getRandomElement(roles);
}

function getRandomScope(): string {
  const scope = ['internal', 'external'];
  return getRandomElement(scope);
}

function getRandomStatus(): string {
  const status = ['active', 'active', 'active', 'active', 'suspend'];
  return getRandomElement(status);
}

function getSequentialDate(index: number, total: number): Date {
  const now = new Date();
  const past = new Date();
  past.setFullYear(now.getFullYear() - 1);

  const range = now.getTime() - past.getTime();

  const time = past.getTime() + (range / total) * index;
  return new Date(time);
}

const fakeApi = {
  getInstructorRegistrations: async (
    page: number = 1,
    pageSize: number = 10,
    sortBy?: string,
    sortOrder?: string | null,
    q?: string,
    filters?: FilterItem[]
  ): Promise<{ instructorRegistrations: InstructorRegistration[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const total = 123;

    const allRegistrations: InstructorRegistration[] = Array.from({ length: total }, (_, index) => {
      const name = generateRandomName();
      const avatarUrl = `https://picsum.photos/200?random=${index}`;
      const email = `${nameToEmail(name)}@example.com`;
      const createdAt = toLocaleDateString(getSequentialDate(index, total));

      return {
        id: index + 1,
        name,
        avatarUrl,
        email,
        createdAt,
      };
    });

    let filteredRegistrations = [...allRegistrations];
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredRegistrations = filteredRegistrations.filter((registration) =>
        Object.values(registration).some((value) => String(value).toLowerCase().includes(searchTerm))
      );
    }

    if (filters && filters.length > 0) {
      filters.forEach((f) => {
        if (!f.value) return;
        filteredRegistrations = filteredRegistrations.filter((user) => {
          const val = String(user[f.field as keyof InstructorRegistration]).toLowerCase();
          const target = f.value.toLowerCase();

          switch (f.operator) {
            case 'eq':
              return val === target;
            case 'ne':
              return val !== target;
            case 'like':
              return val.includes(target);
            case 'gt':
              return val > target;
            case 'lt':
              return val < target;
            case 'gte':
              return val >= target;
            case 'lte':
              return val <= target;
            case 'between': {
              const [start, end] = target.split(',');
              return val >= start && val <= end;
            }
            default:
              return true;
          }
        });
      });
    }

    if (sortBy && sortOrder) {
      filteredRegistrations.sort((a, b) => {
        const aVal = a[sortBy as keyof InstructorRegistration];
        const bVal = b[sortBy as keyof InstructorRegistration];

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const startIndex = (page - 1) * pageSize;
    const paginatedRegistrations = filteredRegistrations.slice(startIndex, startIndex + pageSize);

    return {
      instructorRegistrations: paginatedRegistrations,
      total: filteredRegistrations.length,
    };
  },
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

  const [registrations, setRegistrations] = useState<InstructorRegistration[]>([]);
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

  useEffect(() => {
    console.log(filterModel);
  }, [filterModel]);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        const sortField = sortModel[0]?.field;
        const sortOrder = sortModel[0]?.sort;
        const search = filterModel.quickFilterValues?.join(' ');

        const response = await fakeApi.getInstructorRegistrations(
          paginationModel.page + 1,
          paginationModel.pageSize,
          sortField,
          sortOrder,
          search,
          filters
        );

        setRegistrations(response.instructorRegistrations);
        setTotal(response.total);
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
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'avatarUrl',
      headerName: 'Ảnh',
      width: 70,
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
      field: 'name',
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
      field: 'createdAt',
      headerName: 'Ngày đăng ký',
      width: 120,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 140,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Box>
          <Tooltip title='Chấp nhận'>
            <IconButton color='success'>
              <CheckCircleOutline />
            </IconButton>
          </Tooltip>
          <Tooltip title='Từ chối'>
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
      rows={registrations}
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
