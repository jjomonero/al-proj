import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const Support = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Suporte</h1>
          <p className="text-muted-foreground mt-1">
            Como podemos ajudar você hoje?
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <MessageSquare className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Chat Online</h3>
          <p className="text-muted-foreground mb-4">
            Converse com nosso assistente virtual para tirar suas dúvidas.
          </p>
          <Button asChild>
            <Link to="/chat">Iniciar Chat</Link>
          </Button>
        </Card>

        <Card className="p-6">
          <Mail className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Email</h3>
          <p className="text-muted-foreground mb-4">
            Envie-nos um email e responderemos em até 24 horas.
          </p>
          <Button asChild>
            <a href="mailto:suporte@rentflow.com">Enviar Email</a>
          </Button>
        </Card>

        <Card className="p-6">
          <Phone className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Telefone</h3>
          <p className="text-muted-foreground mb-4">
            Ligue para nosso suporte das 9h às 18h.
          </p>
          <Button asChild>
            <a href="tel:0800123456">0800 123 456</a>
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Support;