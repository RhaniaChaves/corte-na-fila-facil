
import React, { useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, RotateCw } from "lucide-react";

const AdminPanel: React.FC = () => {
  const { currentNumber, lastTicket, updateCurrentNumber, callNext } = useQueue();
  const [inputNumber, setInputNumber] = useState<number>(currentNumber);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setInputNumber(value);
    } else {
      setInputNumber(0);
    }
  };

  const handleUpdate = () => {
    updateCurrentNumber(inputNumber);
  };

  return (
    <Card className="shadow-lg border-2 border-gray-200 w-full max-w-md mx-auto">
      <CardHeader className="bg-gray-50">
        <CardTitle>Painel de Controle</CardTitle>
        <CardDescription>Gerenciamento de senhas do açougue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid grid-cols-2 gap-6 mb-4">
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <div className="text-sm text-gray-500 mb-1">Senha Atual</div>
            <div className="text-3xl font-bold text-butcher">{currentNumber}</div>
          </div>
          <div className="bg-gray-100 p-4 rounded-md text-center">
            <div className="text-sm text-gray-500 mb-1">Última Senha</div>
            <div className="text-3xl font-bold text-gray-700">{lastTicket}</div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="numberInput" className="text-sm font-medium">
            Atualizar senha atual:
          </label>
          <div className="flex gap-2">
            <Input
              id="numberInput"
              type="number"
              min="0"
              value={inputNumber}
              onChange={handleInputChange}
              className="flex-1"
            />
            <Button onClick={handleUpdate} variant="outline">
              <RotateCw size={18} className="mr-1" />
              Atualizar
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t p-4">
        <Button 
          onClick={callNext} 
          className="w-full bg-butcher hover:bg-butcher-dark"
        >
          <ChevronRight size={20} className="mr-1" />
          Chamar Próxima Senha
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AdminPanel;
