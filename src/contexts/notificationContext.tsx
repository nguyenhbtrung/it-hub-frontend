'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import MuiAlert, { AlertColor } from '@mui/material/Alert';
import Alert from '@mui/material/Alert';

interface NotificationContextType {
  notify: (severity: AlertColor, message: string, position?: SnackbarOrigin) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<AlertColor>('success');
  const [position, setPosition] = useState<SnackbarOrigin>({
    vertical: 'bottom',
    horizontal: 'center',
  });

  const notify = (severity: AlertColor, message: string, position?: SnackbarOrigin) => {
    setSeverity(severity);
    setMessage(message);
    setPosition(position || { vertical: 'bottom', horizontal: 'center' });
    setOpen(true);
  };

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={position}>
        <Alert onClose={handleClose} severity={severity} sx={{ borderRadius: 0.5 }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
};
