
import React from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";
import { Ticket } from "lucide-react";

const TicketButton: React.FC = () => {
  const { getNewTicket } = useQueue();

  return (
    <Button 
      onClick={getNewTicket}
      className="bg-butcher hover:bg-butcher-dark transition-all duration-300 text-white py-6 px-8 rounded-lg text-xl flex items-center gap-3 shadow-lg"
    >
      <Ticket size={24} />
      Pegar senha do açougue
    </Button>
  );
};

export default TicketButton;
