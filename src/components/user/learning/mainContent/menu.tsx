import { Popover, MenuItem, IconButton, Typography, ListItemIcon, Box } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LightbulbIcon from '@mui/icons-material/Lightbulb'; // Icon cho mục cha
import GavelIcon from '@mui/icons-material/Gavel';
import ExploreIcon from '@mui/icons-material/Explore';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useRef, useState } from 'react';

type Flexibility = 'STRICT' | 'GUIDED' | 'OPEN';

const OPTIONS = [
  { value: 'STRICT', label: 'Chặt chẽ', icon: <GavelIcon fontSize='small' /> },
  { value: 'GUIDED', label: 'Tiêu chuẩn', icon: <ExploreIcon fontSize='small' /> },
  { value: 'OPEN', label: 'Mở rộng', icon: <AutoAwesomeIcon fontSize='small' /> },
] as const;

export function ChatMenu({ value, onChange }: { value: Flexibility; onChange: (v: Flexibility) => void }) {
  const [mainAnchor, setMainAnchor] = useState<HTMLElement | null>(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState<HTMLElement | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOpenMain = (event: React.MouseEvent<HTMLElement>) => {
    setMainAnchor(event.currentTarget);
  };

  const handleOpenSub = (event: React.MouseEvent<HTMLElement>) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setSubMenuAnchor(event.currentTarget);
  };

  const handleCloseAll = () => {
    setMainAnchor(null);
    setSubMenuAnchor(null);
  };

  const handleScheduleClose = () => {
    timeoutRef.current = setTimeout(() => {
      setSubMenuAnchor(null);
    }, 200);
  };

  const handleCancelClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  return (
    <>
      <IconButton onClick={handleOpenMain}>
        <TuneIcon />
      </IconButton>

      {/* Menu Chính */}
      <Popover
        open={Boolean(mainAnchor)}
        anchorEl={mainAnchor}
        onClose={handleCloseAll}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <MenuItem
          onMouseEnter={handleOpenSub}
          onMouseLeave={handleScheduleClose}
          sx={{
            minWidth: 220,
            display: 'flex',
            alignItems: 'center',
            backgroundColor: Boolean(subMenuAnchor) ? 'action.hover' : 'transparent',
          }}
        >
          <ListItemIcon sx={{ minWidth: '36px !important' }}>
            <LightbulbIcon fontSize='small' />
          </ListItemIcon>
          <Typography variant='body2' sx={{ flexGrow: 1 }}>
            Độ sáng tạo
          </Typography>
          <ChevronRightIcon fontSize='small' sx={{ color: 'action.disabled' }} />
        </MenuItem>
      </Popover>

      {/* Menu Con */}
      <Popover
        open={Boolean(subMenuAnchor)}
        anchorEl={subMenuAnchor}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        disableRestoreFocus
        sx={{ pointerEvents: 'none' }}
        PaperProps={{
          onMouseEnter: handleCancelClose,
          onMouseLeave: handleScheduleClose,
          sx: {
            pointerEvents: 'auto',
            ml: 0.2,
            boxShadow: 3,
          },
        }}
      >
        {OPTIONS.map((opt) => (
          <MenuItem
            key={opt.value}
            selected={value === opt.value}
            onClick={() => {
              onChange(opt.value);
              handleCloseAll();
            }}
            sx={{ minWidth: 160 }}
          >
            <ListItemIcon sx={{ minWidth: '36px !important' }}>{opt.icon}</ListItemIcon>
            <Typography variant='body2'>{opt.label}</Typography>
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
