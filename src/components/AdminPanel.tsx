
import React, { useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ChevronRight, RotateCw, List } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const AdminPanel: React.FC = () => {
  const { currentNumber, lastTicket, updateCurrentNumber, callNext, orders, averageWaitTime } = useQueue();
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

  const pendingOrders = orders.filter(order => 
    order.status === "pending" || order.status === "processing"
  );

  return (
    <Card className="shadow-lg border-2 border-gray-200 w-full max-w-xl mx-auto">
      <CardHeader className="bg-gray-50">
        <CardTitle>Painel de Controle</CardTitle>
        <CardDescription>Gerenciamento de senhas do açougue</CardDescription>
      </CardHeader>
      
      <Tabs defaultValue="queue" className="w-full">
        <TabsList className="grid w-full grid-cols-2 border-t">
          <TabsTrigger value="queue">Controle de Senhas</TabsTrigger>
          <TabsTrigger value="orders">
            Pedidos
            {pendingOrders.length > 0 && (
              <span className="ml-2 bg-butcher text-white text-xs font-bold px-2 py-1 rounded-full">
                {pendingOrders.length}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="queue">
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
        </TabsContent>
        
        <TabsContent value="orders">
          <CardContent className="py-6">
            <div className="text-center mb-4">
              <h3 className="font-medium flex items-center justify-center">
                <List size={18} className="mr-2" />
                Pedidos Antecipados
              </h3>
              <p className="text-sm text-gray-500">
                {pendingOrders.length} pedido(s) pendente(s)
              </p>
            </div>
            
            {pendingOrders.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Senha</TableHead>
                      <TableHead>Cliente</TableHead>
                      <TableHead className="w-24">Telefone</TableHead>
                      <TableHead className="text-right">Itens</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.ticketNumber}</TableCell>
                        <TableCell>{order.customerName}</TableCell>
                        <TableCell>{order.phone || "-"}</TableCell>
                        <TableCell className="text-right">
                          {order.items.length} {order.items.length === 1 ? 'item' : 'itens'}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Não há pedidos pendentes no momento
              </div>
            )}
          </CardContent>
        </TabsContent>
      </Tabs>
    </Card>
  );
};

export default AdminPanel;
