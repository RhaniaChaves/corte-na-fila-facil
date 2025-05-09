
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueueProvider } from "@/contexts/QueueContext";
import TicketButton from "@/components/TicketButton";
import QueueDisplay from "@/components/QueueDisplay";
import AdminPanel from "@/components/AdminPanel";

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
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="client">Cliente</TabsTrigger>
              <TabsTrigger value="display">Acompanhamento</TabsTrigger>
              <TabsTrigger value="admin">Funcionário</TabsTrigger>
            </TabsList>
            
            <TabsContent value="client" className="flex flex-col items-center justify-center py-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-2">Bem-vindo ao Açougue</h2>
                <p className="text-gray-600 mb-8">Clique no botão abaixo para retirar sua senha</p>
                <TicketButton />
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
