import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  content: string;
  isBot: boolean;
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    try {
      setIsLoading(true);
      setMessages(prev => [...prev, { content: input, isBot: false }]);
      
      const { data, error } = await supabase.functions.invoke('chat-bot', {
        body: { prompt: input }
      });

      if (error) throw error;

      setMessages(prev => [...prev, { content: data.answer, isBot: true }]);
      setInput("");

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao enviar mensagem",
        description: "Tente novamente mais tarde"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg bg-white">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Assistente Virtual</h2>
        <p className="text-sm text-muted-foreground">
          Tire suas dúvidas sobre contratos, pagamentos e mais
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.isBot ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isBot
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            Enviar
          </Button>
        </div>
      </div>
    </div>
  );
}