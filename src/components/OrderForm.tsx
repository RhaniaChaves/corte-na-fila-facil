
import React, { useState } from "react";
import { useQueue } from "@/contexts/QueueContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus } from "lucide-react";
import { OrderItem } from "@/contexts/QueueContext";

const MEAT_CUTS = [
  "Picanha",
  "Contrafilé",
  "Alcatra",
  "Maminha",
  "Costela",
  "Fraldinha",
  "Patinho",
  "Acém",
  "Paleta",
  "Músculo",
  "Filé Mignon",
];

const OrderForm: React.FC = () => {
  const { lastTicket, addOrder } = useQueue();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [items, setItems] = useState<Array<OrderItem>>([{ cut: MEAT_CUTS[0], quantity: 1, unit: "kg" }]);

  const handleAddItem = () => {
    setItems([...items, { cut: MEAT_CUTS[0], quantity: 1, unit: "kg" }]);
  };

  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);
    }
  };

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;

    addOrder({
      ticketNumber: lastTicket,
      customerName,
      phone: phone || undefined,
      items,
      status: "pending"
    });

    // Reset form
    setCustomerName("");
    setPhone("");
    setItems([{ cut: MEAT_CUTS[0], quantity: 1, unit: "kg" }]);
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Faça seu pedido antecipado</CardTitle>
        <CardDescription>
          Selecione os cortes que deseja e retire sem precisar esperar
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Seu nome</Label>
              <Input
                id="name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Nome completo"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Telefone (opcional)</Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(99) 99999-9999"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Itens do pedido</Label>
                <Button
                  type="button"
                  onClick={handleAddItem}
                  variant="ghost"
                  size="sm"
                  className="text-butcher"
                >
                  <Plus size={16} className="mr-1" />
                  Adicionar item
                </Button>
              </div>

              {items.map((item, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1">
                    <Label htmlFor={`cut-${index}`}>Corte</Label>
                    <Select
                      value={item.cut}
                      onValueChange={(value) => updateItem(index, "cut", value)}
                    >
                      <SelectTrigger id={`cut-${index}`}>
                        <SelectValue placeholder="Selecione o corte" />
                      </SelectTrigger>
                      <SelectContent>
                        {MEAT_CUTS.map((cut) => (
                          <SelectItem key={cut} value={cut}>
                            {cut}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="w-24">
                    <Label htmlFor={`quantity-${index}`}>Quantidade</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      min="0.1"
                      step="0.1"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, "quantity", parseFloat(e.target.value))}
                    />
                  </div>

                  <div className="w-20">
                    <Label htmlFor={`unit-${index}`}>Unidade</Label>
                    <Select
                      value={item.unit}
                      onValueChange={(value) => updateItem(index, "unit", value)}
                    >
                      <SelectTrigger id={`unit-${index}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="kg">kg</SelectItem>
                        <SelectItem value="g">g</SelectItem>
                        <SelectItem value="un">un</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {items.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="text-red-500"
                      onClick={() => handleRemoveItem(index)}
                    >
                      <X size={18} />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="bg-butcher hover:bg-butcher-dark w-full"
          >
            Confirmar pedido
          </Button>
        </form>
      </CardContent>
      <CardFooter className="text-sm text-gray-500 flex justify-center bg-gray-50">
        Seu pedido será vinculado à senha: {lastTicket || "---"}
      </CardFooter>
    </Card>
  );
};

export default OrderForm;
