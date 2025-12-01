import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronRight from '@mui/icons-material/ChevronRight';

interface Props {
  openSidebar: boolean;
  handleToggleSidebar: () => void;
}

export function SidebarToggle({ openSidebar, handleToggleSidebar }: Props) {
  return (
    <Box
      onClick={handleToggleSidebar}
      role='button'
      aria-label='Mở sidebar nội dung khoá học'
      sx={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 10,
        display: { xs: 'none', md: openSidebar ? 'none' : 'flex' },
        alignItems: 'center',
        height: 40,
        width: 40,
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'grey.300',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'width 280ms cubic-bezier(.2,.8,.2,1), background-color 180ms',
        '&:hover': {
          width: 180,
          bgcolor: 'grey.100',
        },
        // khi hover trên container thì áp dụng cho label
        '&:hover .label': {
          opacity: 1,
          transform: 'translateX(0)',
        },
      }}
    >
      <IconButton
        size='small'
        sx={{
          minWidth: 40,
          width: 40,
          height: 40,
          p: 0,
          color: 'text.secondary',
          // giữ nền trong suốt để không che label khi mở rộng
          bgcolor: 'transparent',
          '&:hover': { bgcolor: 'transparent' },
        }}
      >
        <ChevronRight sx={{ fontSize: 28, transition: 'transform 280ms' }} />
      </IconButton>

      <Typography
        component='span'
        className='label'
        variant='subtitle2'
        sx={{
          ml: 1,
          pr: 2,
          whiteSpace: 'nowrap',
          fontWeight: 500,
          color: 'text.primary',
          opacity: 0,
          transform: 'translateX(-8px)',
          transition: 'opacity 220ms ease, transform 220ms ease',
          pointerEvents: 'none',
        }}
      >
        Nội dung khoá học
      </Typography>
    </Box>
  );
}
