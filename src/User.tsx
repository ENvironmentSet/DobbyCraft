import React, {
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';

export interface User {
  name: string;
  home: {
    address: string;
    latitude: string;
    longitude: string;
  };
}

const diverseUser = {
  get name(): string {
    throw new Error('Oh, No!');
  },
  get home(): User['home'] {
    throw new Error('Oh, No!');
  },
};

const userContext = React.createContext<{
  user: User;
  updateData(updatedPart: Partial<User>): void;
}>({
  user: diverseUser,
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
  const [home, setHome] = useState<User['home']>();
  const updateData = useCallback(updatedPart => {
    if ('name' in updatedPart) {
      setName(updatedPart.name);
    }
    if ('home' in updatedPart) {
      setHome(updatedPart.home);
    }
  }, []);
  const user = useMemo(() => (name && home ? { name, home } : diverseUser), [
    name,
    home,
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
