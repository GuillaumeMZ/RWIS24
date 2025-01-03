import React, { createContext, useContext, useState } from 'react';

interface Ingredient {
  name: string;
  price: number;
}

interface UserData {
  name: string;
  selectedIngredients: { [key: string]: { quantity: number; price: number } };
}

interface DataContextType {
  ingredients: Ingredient[];
  userData: UserData[];
  addIngredient: (ingredient: Ingredient) => void;
  addUserSelection: (name: string, ingredientName: string, quantity: number, price: number) => void;
  clearUsers: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);

  const addIngredient = (ingredient: Ingredient) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  const addUserSelection = (name: string, ingredientName: string, quantity: number, price: number) => {
    setUserData((prev) => {
      const existingUser = prev.find((user) => user.name === name);
      if (existingUser) {
        existingUser.selectedIngredients[ingredientName] = { quantity, price };
        return [...prev];
      } else {
        return [...prev, { name, selectedIngredients: { [ingredientName]: { quantity, price } } }];
      }
    });
  };

  const clearUsers = () => {
    setUserData([]);
  };

  return (
    <DataContext.Provider value={{ ingredients, userData, addIngredient, addUserSelection, clearUsers }}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};

