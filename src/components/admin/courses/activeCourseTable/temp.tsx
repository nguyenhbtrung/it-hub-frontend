'use client';

import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from '@mui/x-data-grid';
import { Avatar, Box, Chip, IconButton, Tooltip, Typography } from '@mui/material';
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
import { getCourses } from '@/services/course.service';

interface ActiveCourse {
  id: number;
  imgUrl: string;
  title: string;
  category: string;
  instructor: string;
  avatarUrl: string;
  status: string;
  createdAt: string;
}

const activeCourseSchema: Record<keyof ActiveCourse, FieldType> = {
  id: 'number',
  imgUrl: 'string',
  title: 'string',
  category: 'string',
  instructor: 'string',
  avatarUrl: 'string',
  status: 'string',
  createdAt: 'string',
};

const activeCourseFieldsMap: Record<keyof ActiveCourse, string> = {
  id: 'ID',
  imgUrl: 'Ảnh bìa khoá học',
  title: 'Tiêu đề',
  category: 'Danh mục',
  instructor: 'Giảng viên',
  avatarUrl: 'Ảnh đại diện',
  status: 'Trạng thái',
  createdAt: 'Ngày tạo',
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

function generateRandomCategory(): string {
  const categories = ['Phát triển web', 'Khoa học dữ liệu', 'Trí tuệ nhân tạo', 'Game', 'Mobile', 'Thuật toán'];

  return getRandomElement(categories);
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
  getActiveCourses: async (
    page: number = 1,
    pageSize: number = 10,
    sortBy?: string,
    sortOrder?: string | null,
    q?: string,
    filters?: FilterItem[]
  ): Promise<{ activeCourses: ActiveCourse[]; total: number }> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const total = 123;

    const allCourses: ActiveCourse[] = Array.from({ length: total }, (_, index) => {
      const imgUrl = `https://picsum.photos/200?random=${index}`;
      const title = 'Khoá học ' + index;
      const instructor = generateRandomName();
      const avatarUrl = `https://picsum.photos/200?random=${index + total}`;
      const category = generateRandomCategory();
      const createdAt = toLocaleDateString(getSequentialDate(index, total));

      return {
        id: index + 1,
        imgUrl,
        title,
        instructor,
        avatarUrl,
        category,
        status: 'active',
        createdAt,
      };
    });

    let filteredCourses = [...allCourses];
    if (q) {
      const searchTerm = q.toLowerCase();
      filteredCourses = filteredCourses.filter((registration) =>
        Object.values(registration).some((value) => String(value).toLowerCase().includes(searchTerm))
      );
    }

    if (filters && filters.length > 0) {
      filters.forEach((f) => {
        if (!f.value) return;
        filteredCourses = filteredCourses.filter((user) => {
          const val = String(user[f.field as keyof ActiveCourse]).toLowerCase();
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
      filteredCourses.sort((a, b) => {
        const aVal = a[sortBy as keyof ActiveCourse];
        const bVal = b[sortBy as keyof ActiveCourse];

        if (aVal < bVal) return sortOrder === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    const startIndex = (page - 1) * pageSize;
    const paginatedCourses = filteredCourses.slice(startIndex, startIndex + pageSize);

    return {
      activeCourses: paginatedCourses,
      total: filteredCourses.length,
    };
  },
};

export default function ActiveCourseTable() {
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

  const [data, setData] = useState<ActiveCourse[]>([]);
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
    initFilters.length > 0 ? initFilters : [getDefaultFilter<ActiveCourse>(activeCourseSchema)]
  );
  const isMounted = useMounted();

  useEffect(() => {
    const fetchActiveCourses = async () => {
      setLoading(true);
      try {
        const sortField = sortModel[0]?.field;
        const sortOrder = sortModel[0]?.sort || 'asc';
        const search = filterModel.quickFilterValues?.join(' ');

        // const res = await getCourses({
        //   page: paginationModel.page + 1,
        //   limit: paginationModel.pageSize,
        //   sortBy: sortField,
        //   sortOrder,
        //   q: search,
        // });

        // setData(res?.data || []);
        // setTotal(res?.meta?.total || 0);

        const response = await fakeApi.getActiveCourses(
          paginationModel.page + 1,
          paginationModel.pageSize,
          sortField,
          sortOrder,
          search,
          filters
        );

        setData(response.activeCourses);
        setTotal(response.total);
      } catch (error) {
        console.error('Lỗi khi tải dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };
    if (isMounted) {
      fetchActiveCourses();
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
      field: 'course',
      headerName: 'Khoá học',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const { imgUrl, title } = params.row;
        return (
          <Box display='flex' alignItems='center' gap={1}>
            <Box
              component='img'
              src={imgUrl}
              alt={title}
              sx={{ width: 48, height: 48, borderRadius: 0.5, objectFit: 'cover' }}
            />
            <Typography variant='body2' noWrap>
              {title}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'instructor',
      headerName: 'Giảng viên',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => {
        const { avatarUrl, instructor } = params.row;
        return (
          <Box height='100%' display='flex' alignItems='center' gap={1}>
            <Avatar src={avatarUrl} alt={instructor} />
            <Typography variant='body2' noWrap>
              {instructor}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'category',
      headerName: 'Danh mục',
      flex: 1,
      minWidth: 150,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      width: 150,
      renderCell: () => <Chip label='Đang hoạt động' color='success' variant='outlined' />,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: () => (
        <Box>
          <Tooltip title='Đình chỉ'>
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
        filterPanel: CustomFilterPanel<ActiveCourse>,
        columnMenu: (props) => (
          <CustomColumnMenu<ActiveCourse> {...props} schema={activeCourseSchema} setFilters={setFilters} />
        ),
      }}
      slotProps={{
        filterPanel: {
          schema: activeCourseSchema,
          fieldsMap: activeCourseFieldsMap,
          filters: filters,
          setFilters: setFilters,
        },
      }}
    />
  );
}
