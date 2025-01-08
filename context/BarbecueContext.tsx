import React, { createContext, useState, useContext, ReactNode } from "react";

interface Barbecue {
  id: number;
  name: string;
  date: string;
  description: string;
  accessCode: string;
}

interface BarbecueContextType {
  barbecues: Barbecue[];
  addBarbecue: (barbecue: Omit<Barbecue, "id">) => void;
}

const BarbecueContext = createContext<BarbecueContextType | undefined>(undefined);

export const BarbecueProvider = ({ children }: { children: ReactNode }) => {
  const [barbecues, setBarbecues] = useState<Barbecue[]>([]);

  const addBarbecue = (barbecue: Omit<Barbecue, "id">) => {
    const newBarbecue = { id: Date.now(), ...barbecue };
    setBarbecues((prev) => [...prev, newBarbecue]);
  };

  return (
    <BarbecueContext.Provider value={{ barbecues, addBarbecue }}>
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
