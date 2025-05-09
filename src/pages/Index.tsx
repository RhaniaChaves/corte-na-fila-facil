
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueueProvider } from "@/contexts/QueueContext";
import TicketButton from "@/components/TicketButton";
import QueueDisplay from "@/components/QueueDisplay";
import AdminPanel from "@/components/AdminPanel";
import OrderForm from "@/components/OrderForm";
import { Smartphone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-butcher-background p-4 md:p-8">
      <QueueProvider>
        <div className="max-w-5xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-butcher mb-2">Açougue Corte Fácil</h1>
            <p className="text-gray-600">Sistema de gerenciamento de filas</p>
          </header>

          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="client">Cliente</TabsTrigger>
              <TabsTrigger value="order">Pedido Antecipado</TabsTrigger>
              <TabsTrigger value="display">Acompanhamento</TabsTrigger>
              <TabsTrigger value="admin">Funcionário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client" className="flex flex-col items-center justify-center py-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Açougue</h2>
                <p className="text-gray-600 mb-8">Clique no botão abaixo para retirar sua senha</p>
                <TicketButton />
                
                <div className="mt-12 p-4 bg-butcher-light/30 rounded-lg border border-butcher-light max-w-md mx-auto">
                  <div className="flex items-center gap-3 mb-2">
                    <Smartphone className="text-butcher" size={24} />
                    <h3 className="text-lg font-medium">Em breve no seu celular!</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Estamos desenvolvendo um aplicativo para você retirar sua senha e receber 
                    notificações quando estiver próximo de sua vez!
                  </p>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="order">
              <div className="py-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Faça seu pedido antecipadamente</h2>
                <OrderForm />
              </div>
            </TabsContent>
            
            <TabsContent value="display">
              <div className="py-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Acompanhamento em Tempo Real</h2>
                <QueueDisplay />
              </div>
            </TabsContent>
            
            <TabsContent value="admin">
              <div className="py-8">
                <h2 className="text-2xl font-bold mb-8 text-center">Controle de Senhas</h2>
                <AdminPanel />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </QueueProvider>
    </div>
  );
};

export default Index;
