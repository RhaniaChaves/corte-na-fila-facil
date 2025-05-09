
import React from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

const TicketButton: React.FC = () => {
  const { getNewTicket, lastTicket } = useQueue();

  const handleGetTicket = () => {
    getNewTicket();
  };

  return (
    <div className="flex flex-col items-center">
      <Button 
        onClick={handleGetTicket}
        className="bg-butcher hover:bg-butcher-dark transition-all duration-300 text-white py-6 px-8 rounded-lg text-xl flex items-center gap-3 shadow-lg"
      >
        <Ticket size={24} />
        Pegar senha do açougue
      </Button>
      {lastTicket > 0 && (
        <p className="mt-4 text-gray-600">
          Sua senha é: <span className="font-bold text-xl text-butcher">{lastTicket}</span>
        </p>
      )}
    </div>
  );
};

export default TicketButton;
