import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Ingredient {
  id: number;
  name: string;
  standardPortion: number;
  costPerPortion: number;
  unit: string;
}

interface User {
  name: string;
  quantities?: { id: number; name: string; portions: number }[];
}

interface Barbecue {
  id: number;
  name: string;
  date: string;
  description: string;
  accessCode: string;
  selected?: boolean;
  ingredients: Ingredient[];
  users: User[];
  distributionMatrix?: { [key: string]: { quantity: string; cost: string }[] };
}

interface BarbecueContextType {
  barbecues: Barbecue[];
  addBarbecue: (barbecue: Omit<Barbecue, "id" | "ingredients" | "users" | "distributionMatrix">) => void;
  deleteBarbecue: (id: number) => void;
  selectBarbecue: (id: number) => void;
  addIngredient: (ingredient: Omit<Ingredient, "id">) => void;
  deleteIngredient: (ingredientName: string) => void;
  editIngredient: (ingredientName: string, updatedIngredient: Ingredient) => void;
  addUserToBarbecue: (barbecueId: number, user: User) => void;
  updateUserQuantities: (
    barbecueId: number,
    userName: string,
    quantities: { id: number; name: string; portions: number }[]
  ) => void;
  calculateDistribution: (barbecueId: number) => void;
  getDistributionForUser: (barbecueId: number, userName: string) => { quantity: string; cost: string }[] | null;
  deleteUserFromBarbecue: (barbecueId: number, userName: string) => void;
}

const BarbecueContext = createContext<BarbecueContextType | undefined>(undefined);

const STORAGE_KEY = "@barbecues";

export const BarbecueProvider = ({ children }: { children: ReactNode }) => {
  const [barbecues, setBarbecues] = useState<Barbecue[]>([]);

  useEffect(() => {
    const loadBarbecues = async () => {
      try {
        const storedBarbecues = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedBarbecues) {
          setBarbecues(JSON.parse(storedBarbecues));
        }
      } catch (error) {
        console.error("Failed to load barbecues from AsyncStorage:", error);
      }
    };

    loadBarbecues();
  }, []);

  useEffect(() => {
    const saveBarbecues = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(barbecues));
      } catch (error) {
        console.error("Failed to save barbecues to AsyncStorage:", error);
      }
    };

    saveBarbecues();
  }, [barbecues]);

  const addBarbecue = (barbecue: Omit<Barbecue, "id" | "ingredients" | "users" | "distributionMatrix">) => {
    const newBarbecue: Barbecue = {
      id: Date.now(),
      ingredients: [],
      users: [],
      distributionMatrix: {},
      ...barbecue,
    };
    setBarbecues((prev) => [...prev, newBarbecue]);
  };

  const deleteBarbecue = (id: number) => {
    setBarbecues((prev) => prev.filter((barbecue) => barbecue.id !== id));
  };

  const selectBarbecue = (id: number) => {
    setBarbecues((prev) =>
      prev.map((barbecue) => ({
        ...barbecue,
        selected: barbecue.id === id,
      }))
    );
  };

  const addIngredient = (ingredient: Omit<Ingredient, "id">) => {
    setBarbecues((prev) =>
      prev.map((barbecue) =>
        barbecue.selected
          ? {
              ...barbecue,
              ingredients: [
                ...barbecue.ingredients,
                { id: Date.now(), ...ingredient },
              ],
            }
          : barbecue
      )
    );
  };

  const deleteIngredient = (ingredientName: string) => {
    setBarbecues((prev) =>
      prev.map((barbecue) =>
        barbecue.selected
          ? {
              ...barbecue,
              ingredients: barbecue.ingredients.filter(
                (ingredient) => ingredient.name !== ingredientName
              ),
            }
          : barbecue
      )
    );
  };

  const editIngredient = (ingredientName: string, updatedIngredient: Ingredient) => {
    setBarbecues((prev) =>
      prev.map((barbecue) =>
        barbecue.selected
          ? {
              ...barbecue,
              ingredients: barbecue.ingredients.map((ingredient) =>
                ingredient.name === ingredientName ? updatedIngredient : ingredient
              ),
            }
          : barbecue
      )
    );
  };

  const addUserToBarbecue = (barbecueId: number, user: User) => {
    setBarbecues((prev) =>
      prev.map((barbecue) => {
        if (barbecue.id === barbecueId) {
          const userExists = barbecue.users.some(
            (existingUser) => existingUser.name === user.name
          );

          if (!userExists) {
            return {
              ...barbecue,
              users: [...barbecue.users, user],
            };
          }
        }
        return barbecue;
      })
    );
  };

  const updateUserQuantities = (
    barbecueId: number,
    userName: string,
    quantities: { id: number; name: string; portions: number }[]
  ) => {
    setBarbecues((prev) =>
      prev.map((barbecue) => {
        if (barbecue.id === barbecueId) {
          const updatedUsers = barbecue.users.map((user) =>
            user.name === userName
              ? { ...user, quantities }
              : user
          );

          return { ...barbecue, users: updatedUsers };
        }
        return barbecue;
      })
    );
  };

  const calculateDistribution = (barbecueId: number) => {
    setBarbecues((prev) =>
      prev.map((barbecue) => {
        if (barbecue.id !== barbecueId) return barbecue;

        const distributionMatrix: { [key: string]: { quantity: string; cost: string }[] } = {};

        barbecue.users.forEach((user) => {
          distributionMatrix[user.name] = barbecue.ingredients.map((ingredient) => {
            const userPortions =
              user.quantities?.find((q) => q.id === ingredient.id)?.portions || 0;
            const totalQuantity = userPortions * ingredient.standardPortion;
            const totalCost = userPortions * ingredient.costPerPortion;

            return {
              quantity: `${totalQuantity.toFixed(2)} ${ingredient.unit}`,
              cost: `${totalCost.toFixed(2)} yen`,
            };
          });
        });

        return {
          ...barbecue,
          distributionMatrix,
        };
      })
    );
  };

  const getDistributionForUser = (barbecueId: number, userName: string) => {
    const barbecue = barbecues.find((bbq) => bbq.id === barbecueId);
    if (!barbecue || !barbecue.distributionMatrix) return null;
    return barbecue.distributionMatrix[userName] || null;
  };

  const deleteUserFromBarbecue = (barbecueId: number, userName: string) => {
    setBarbecues((prev) =>
      prev.map((barbecue) => {
        if (barbecue.id === barbecueId) {
          return {
            ...barbecue,
            users: barbecue.users.filter((user) => user.name !== userName),
          };
        }
        return barbecue;
      })
    );
  };

  return (
    <BarbecueContext.Provider
      value={{
        barbecues,
        addBarbecue,
        deleteBarbecue,
        selectBarbecue,
        addIngredient,
        deleteIngredient,
        editIngredient,
        addUserToBarbecue,
        updateUserQuantities,
        calculateDistribution,
        getDistributionForUser,
        deleteUserFromBarbecue,
      }}
    >
      {children}
    </BarbecueContext.Provider>
  );
};

export const useBarbecueContext = () => {
  const context = useContext(BarbecueContext);
  if (!context) {
    throw new Error("useBarbecueContext must be used within a BarbecueProvider");
  }
  return context;
};

