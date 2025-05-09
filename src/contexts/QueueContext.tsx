
import React, { createContext, useContext, useState } from "react";
import { toast } from "@/components/ui/use-toast";

interface QueueContextType {
  currentNumber: number;
  lastTicket: number;
  getNewTicket: () => number;
  updateCurrentNumber: (number: number) => void;
  callNext: () => void;
  averageWaitTime: number;
  estimatedWaitTime: (ticketNumber: number) => number;
  orders: Order[];
  addOrder: (order: Omit<Order, "id">) => void;
}

export interface OrderItem {
  cut: string;
  quantity: number;
  unit: string;
}

export interface Order {
  id: number;
  ticketNumber: number;
  customerName: string;
  phone?: string;
  items: OrderItem[];
  status: "pending" | "processing" | "ready" | "completed";
}

const QueueContext = createContext<QueueContextType | undefined>(undefined);

export const QueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentNumber, setCurrentNumber] = useState(0);
  const [lastTicket, setLastTicket] = useState(0);
  const [averageWaitTime, setAverageWaitTime] = useState(3); // Average minutes per customer
  const [orders, setOrders] = useState<Order[]>([]);

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

  const estimatedWaitTime = (ticketNumber: number): number => {
    if (ticketNumber <= currentNumber) return 0;
    return (ticketNumber - currentNumber) * averageWaitTime;
  };

  const addOrder = (order: Omit<Order, "id">) => {
    const newOrder = {
      ...order,
      id: orders.length + 1,
    };
    setOrders([...orders, newOrder]);
    toast({
      title: "Pedido registrado com sucesso!",
      description: `Pedido vinculado à senha ${order.ticketNumber}`,
      duration: 5000,
    });
  };

  return (
    <QueueContext.Provider
      value={{ 
        currentNumber, 
        lastTicket, 
        getNewTicket, 
        updateCurrentNumber, 
        callNext,
        averageWaitTime,
        estimatedWaitTime,
        orders,
        addOrder
      }}
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
