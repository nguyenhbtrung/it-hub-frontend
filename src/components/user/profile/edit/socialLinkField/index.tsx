import { TextField, InputAdornment } from '@mui/material';
import { GitHub, LinkedIn, Language } from '@mui/icons-material';
import { FormField } from '../types';

interface SocialLinkFieldProps {
  field: FormField;
  value: string;
  onChange: (value: string) => void;
}

export default function SocialLinkField({ field, value, onChange }: SocialLinkFieldProps) {
  const getIcon = () => {
    switch (field.name) {
      case 'github':
        return <GitHub />;
      case 'linkedin':
        return <LinkedIn />;
      case 'website':
        return <Language />;
      default:
        return null;
    }
  };

  const formatUrl = (url: string): string => {
    if (!url) return '';
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `https://${url}`;
    }
    return url;
  };

  return (
    <TextField
      fullWidth
      type='url'
      label={field.label}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={field.placeholder}
      InputProps={{
        startAdornment: <InputAdornment position='start'>{getIcon()}</InputAdornment>,
      }}
      sx={{
        '& .MuiOutlinedInput-root': {
          '&:hover fieldset': {
            borderColor: 'primary.main',
          },
        },
      }}
    />
  );
}
