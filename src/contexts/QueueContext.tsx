
import React, { createContext, useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface QueueContextType {
  currentNumber: number;
  lastTicket: number;
  getNewTicket: () => number;
  updateCurrentNumber: (number: number) => void;
  callNext: () => void;
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [lastTicket, setLastTicket] = useState(0);

  const getNewTicket = () => {
    const newTicket = lastTicket + 1;
    setLastTicket(newTicket);
    toast({
      title: "Senha retirada com sucesso!",
      description: `Sua senha é: ${newTicket}`,
      duration: 5000,
    });
    return newTicket;
  };

  const updateCurrentNumber = (number: number) => {
    if (number >= 0 && number <= lastTicket) {
      setCurrentNumber(number);
    }
  };

  const callNext = () => {
    if (currentNumber < lastTicket) {
      setCurrentNumber(currentNumber + 1);
      toast({
        title: "Próxima senha chamada",
        description: `Senha atual: ${currentNumber + 1}`,
        variant: "default",
      });
    } else {
      toast({
        title: "Não há senhas em espera",
        description: "Todas as senhas já foram atendidas",
        variant: "destructive",
      });
    }
  };

  return (
    <QueueContext.Provider
      value={{ currentNumber, lastTicket, getNewTicket, updateCurrentNumber, callNext }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => {
  const context = useContext(QueueContext);
  if (context === undefined) {
    throw new Error("useQueue must be used within a QueueProvider");
  }
  return context;
};
