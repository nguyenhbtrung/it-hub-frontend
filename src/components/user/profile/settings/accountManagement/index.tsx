import { Box, Typography, Button, Stack, Divider } from '@mui/material';
import { ManageAccounts } from '@mui/icons-material';
import { accountManagementItems } from '../data';

interface AccountManagementProps {
  onPasswordChange: () => void;
  onDeviceManagement: () => void;
  onAccountDelete: () => void;
}

export default function AccountManagement({
  onPasswordChange,
  onDeviceManagement,
  onAccountDelete,
}: AccountManagementProps) {
  const handleAction = (id: string) => {
    switch (id) {
      case 'password':
        onPasswordChange();
        break;
      case 'devices':
        onDeviceManagement();
        break;
      case 'delete':
        onAccountDelete();
        break;
    }
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: 1,
        borderColor: 'divider',
        p: 3,
        mb: 3,
      }}
    >
      <Typography variant='h6' fontWeight='bold' sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
        <ManageAccounts sx={{ color: 'primary.main' }} />
        Quản lý tài khoản
      </Typography>

      <Stack spacing={3}>
        {accountManagementItems.map((item, index) => (
          <Box key={item.id}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                justifyContent: 'space-between',
                alignItems: { xs: 'flex-start', sm: 'center' },
                gap: 2,
              }}
            >
              <Box>
                <Typography fontWeight='medium' sx={{ color: item.id === 'delete' ? 'error.main' : 'text.primary' }}>
                  {item.title}
                </Typography>
                <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
                  {item.description}
                </Typography>
              </Box>
              <Button
                variant={item.variant}
                color={item.color}
                onClick={() => handleAction(item.id)}
                sx={{ minWidth: 120, flexShrink: 0 }}
              >
                {item.buttonText}
              </Button>
            </Box>
            {index < accountManagementItems.length - 1 && <Divider sx={{ mt: 3, borderColor: 'divider' }} />}
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
