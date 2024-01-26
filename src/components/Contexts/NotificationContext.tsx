import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from 'react';

interface Notification {
  text: string;
  type: string;
}

interface NotificationContextProps {
  notification: Notification | null;
  showNotification: (text: string, type: string) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (text: string, type: string) => {
    setNotification({ text, type });
  };

  const hideNotification = () => {
    setNotification(null);
  };

  const contextValue = useMemo(
    () => ({ notification, showNotification, hideNotification }),
    [notification, showNotification, hideNotification]
  );

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = (): NotificationContextProps => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};
