import { ChatBot } from "@/components/support/ChatBot";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Support = () => {
  const { data: faqTopics } = useQuery({
    queryKey: ["faq-topics"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("faq_topics")
        .select("*")
        .order("frequency", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Suporte</h1>
          <p className="text-muted-foreground mt-1">
            Tire suas dúvidas com nosso assistente virtual
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <ChatBot />
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg border">
            <h2 className="text-lg font-semibold mb-4">Tópicos Frequentes</h2>
            <div className="space-y-4">
              {faqTopics?.map((topic) => (
                <div key={topic.id} className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium">{topic.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {topic.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;