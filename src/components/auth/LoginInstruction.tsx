import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

export default function LoginInstruction() {
  const accounts = [
    { role: 'student', email: 'student01@example.com', password: 'student01.Password' },
    { role: 'instructor', email: 'instructor01@example.com', password: 'instructor01.Password' },
    { role: 'admin', email: 'admin01@example.com', password: 'admin01.Password' },
  ];

  return (
    <>
      {/* <Typography variant='h5' fontWeight={700} gutterBottom>
            Tài khoản test
          </Typography> */}

      <Typography mb={2}>Bạn có thể sử dụng một trong những tài khoản test sau để đăng nhập:</Typography>

      <List
        sx={{
          listStyleType: 'disc',
          pl: 3,
          '& .MuiListItem-root': {
            display: 'list-item',
            py: 0,
          },
        }}
      >
        {accounts.map((account) => (
          <ListItem key={account.role}>
            <ListItemText
              primary={
                <>
                  <strong>{account.role}</strong>: {account.email} / {account.password}
                </>
              }
              slotProps={{
                primary: {
                  color: 'inherit',
                  fontStyle: 'italic',
                },
              }}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
