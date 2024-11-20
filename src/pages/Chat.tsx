import { ChatBot } from "@/components/support/ChatBot";

const Chat = () => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Chat</h1>
          <p className="text-muted-foreground mt-1">
            Tire suas dúvidas com nosso assistente virtual
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto">
        <ChatBot />
      </div>
    </div>
  );
};

export default Chat;