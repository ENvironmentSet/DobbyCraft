import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export interface User {
  name?: string;
  password?: string;
  home?: {
    address: string;
    latitude: string;
    longitude: string;
  };
  token?: {
    accessToken: string;
    refreshToken: string;
  };
}

const userContext = React.createContext<{
  user: User;
  updateData(updatedPart: Partial<User>): void;
}>({
  user: {},
  updateData() {},
});

export function ProvideUserData({
  onChange = () => {},
  children,
}: {
  onChange?: (user: User) => void;
  children: React.ReactChild;
}) {
  const [name, setName] = useState<User['name']>();
  const [password, setPassword] = useState<User['password']>();
  const [home, setHome] = useState<User['home']>();
  const [token, setToken] = useState<User['token']>();
  const updateData = useCallback(updatedPart => {
    if ('name' in updatedPart) {
      setName(updatedPart.name);
    }
    if ('home' in updatedPart) {
      setHome(updatedPart.home);
    }
    if ('token' in updatedPart) {
      setToken(updatedPart.token);
    }
    if ('password' in updatedPart) {
      setPassword(updatedPart.password);
    }
  }, []);
  const user = useMemo(() => ({ name, home, token, password }), [
    name,
    home,
    token,
    password,
  ]);

  useEffect(() => onChange(user), [onChange, user]);

  return (
    <userContext.Provider value={{ user, updateData }}>
      {children}
    </userContext.Provider>
  );
}

export function useUserData() {
  return useContext(userContext).user;
}

export function useUserDataUpdater() {
  return useContext(userContext).updateData;
}
