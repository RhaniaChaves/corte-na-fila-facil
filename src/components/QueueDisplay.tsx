
import React, { useEffect, useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const QueueDisplay: React.FC = () => {
  const { currentNumber, lastTicket } = useQueue();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [currentNumber]);

  const waitingCount = lastTicket - currentNumber;

  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md mx-auto shadow-lg border-2 border-butcher">
        <CardHeader className="bg-butcher text-white text-center py-4">
          <CardTitle className="text-2xl font-bold">SENHA ATUAL</CardTitle>
        </CardHeader>
        <CardContent className="flex justify-center items-center h-48">
          <div className={`text-7xl font-bold text-butcher ${animate ? 'animate-number-change' : ''}`}>
            {currentNumber || "---"}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between gap-4">
        <Card className="w-full shadow-md">
          <CardHeader className="bg-butcher-light p-3">
            <CardTitle className="text-lg text-butcher-dark">Última senha</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-semibold">{lastTicket || "---"}</p>
          </CardContent>
        </Card>

        <Card className="w-full shadow-md">
          <CardHeader className="bg-butcher-light p-3">
            <CardTitle className="text-lg text-butcher-dark">Em espera</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-3xl font-semibold">{waitingCount > 0 ? waitingCount : "0"}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QueueDisplay;
