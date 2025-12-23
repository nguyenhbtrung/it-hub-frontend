export interface NotificationSettings {
  emailNotifications: boolean;
  inAppNotifications: boolean;
}

export interface PrivacySettings {
  publicProfile: boolean;
  showProgressBadges: boolean;
  allowEmailSearch: boolean;
}

export interface ThemeSettings {
  theme: 'light' | 'dark';
}

export interface AccountSettings {
  id: string;
  email: string;
  createdAt: string;
}

export interface SettingsData {
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  theme: ThemeSettings;
  account: AccountSettings;
}
