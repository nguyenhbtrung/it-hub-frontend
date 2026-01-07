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
import { getCourses, updateCourseStatus } from '@/services/course.service';
import { useNotification } from '@/contexts/notificationContext';

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
    initFilters.length > 0 ? initFilters : [getDefaultFilter<ActiveCourse>(activeCourseSchema)]
  );
  const isMounted = useMounted();
  const { notify } = useNotification();

  const fetchActiveCourses = async () => {
    setLoading(true);
    try {
      const sortField = sortModel[0]?.field;
      const sortOrder = sortModel[0]?.sort || 'asc';
      const search = filterModel.quickFilterValues?.join(' ');

      const res = await getCourses({
        view: 'admin',
        page: paginationModel.page + 1,
        limit: paginationModel.pageSize,
        sortBy: sortField,
        sortOrder,
        q: search ? search : undefined,
        status: 'published',
      });

      setData(res?.data || []);
      setTotal(res?.meta?.total || 0);

      // const response = await fakeApi.getActiveCourses(
      //   paginationModel.page + 1,
      //   paginationModel.pageSize,
      //   sortField,
      //   sortOrder,
      //   search,
      //   filters
      // );

      // setData(response.activeCourses);
      // setTotal(response.total);
    } catch (error) {
      console.error('Lỗi khi tải dữ liệu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isMounted) {
      fetchActiveCourses();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleSuspendClick = async (id: string) => {
    const res = await updateCourseStatus(id, { status: 'suspended' });
    if (res?.success) {
      notify('success', 'Đã đình chỉ khoá học', { vertical: 'top', horizontal: 'right' });
    } else {
      notify('error', 'Có lỗi xảy ra, vui lòng thử lại', { vertical: 'top', horizontal: 'right' });
    }
    fetchActiveCourses();
  };

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'title',
      headerName: 'Khoá học',
      flex: 1,
      minWidth: 200,
      renderCell: (params) => {
        const { img, title } = params.row;
        return (
          <Box display='flex' alignItems='center' gap={1}>
            <Box
              component='img'
              src={img?.url || `https://picsum.photos/300/200?random=${params.row?.id}`}
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
        const { instructor } = params.row;
        return (
          <Box height='100%' display='flex' alignItems='center' gap={1}>
            <Avatar
              src={instructor?.avatar?.url || `https://picsum.photos/200?random=${params.row?.id}`}
              alt={instructor?.fullname}
            />
            <Typography variant='body2' noWrap>
              {instructor?.fullname}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: 'subCategory',
      headerName: 'Danh mục',
      flex: 1,
      minWidth: 150,
      valueGetter: (value: any) => value?.name,
    },
    {
      field: 'status',
      headerName: 'Trạng thái',
      sortable: false,
      width: 150,
      renderCell: () => <Chip label='Đang hoạt động' color='success' variant='outlined' />,
    },
    {
      field: 'actions',
      headerName: 'Thao tác',
      width: 160,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Box>
          <Tooltip title='Đình chỉ'>
            <IconButton color='error' onClick={() => handleSuspendClick(params.row?.id)}>
              <CancelOutlined />
            </IconButton>
          </Tooltip>
          <Tooltip title='Xem'>
            <IconButton
              onClick={() => {
                const slug = params.row.slug;
                window.open(`/courses/${slug}`, '_blank');
              }}
            >
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
