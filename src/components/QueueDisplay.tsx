
import React, { useEffect, useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock } from "lucide-react";

const QueueDisplay: React.FC = () => {
  const { currentNumber, lastTicket, estimatedWaitTime } = useQueue();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timer);
  }, [currentNumber]);

  const waitingCount = lastTicket - currentNumber;
  const myTicket = lastTicket > 0 ? lastTicket : null;
  const waitTimeForLatest = myTicket ? estimatedWaitTime(myTicket) : 0;

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

      {waitTimeForLatest > 0 && (
        <Card className="w-full shadow-md border-butcher-light">
          <CardHeader className="bg-butcher-light p-3">
            <CardTitle className="flex items-center text-lg text-butcher-dark">
              <Clock size={20} className="mr-2" />
              Tempo de espera estimado
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Sua senha</p>
                <p className="text-2xl font-bold">{myTicket}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tempo aprox.</p>
                <p className="text-2xl font-bold">{waitTimeForLatest} min</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QueueDisplay;
