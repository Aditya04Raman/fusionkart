import { useEffect, useRef, useState } from "react";
import { MessageSquare, Mic, MicOff, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { products } from "@/data/mockProducts";

interface ChatMsg { role: 'user' | 'assistant'; content: string }
interface MemoryItem { q: string; a: string }

const MEM_KEY = 'fusionkart-ai-memory';
const getMemory = (): MemoryItem[] => {
  try { return JSON.parse(localStorage.getItem(MEM_KEY) || '[]'); } catch { return []; }
};
const addMemory = (item: MemoryItem) => {
  const mem = getMemory();
  mem.unshift(item);
  localStorage.setItem(MEM_KEY, JSON.stringify(mem.slice(0, 200)));
};

const searchProducts = (q: string) => {
  const lower = q.toLowerCase();
  const found = products.filter(p =>
    p.name.toLowerCase().includes(lower) || p.category.join(' / ').toLowerCase().includes(lower)
  ).slice(0, 5);
  if (found.length === 0) return `I couldn't find matches for “${q}”. Try another query or browse categories.`;
  return `Here are some picks: \n- ` + found.map(f => `${f.name} — $${f.price.toFixed(2)}`).join("\n- ");
};

const speak = (text: string) => {
  if (!('speechSynthesis' in window)) return;
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
};

const ChatbotWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { role: 'assistant', content: 'Hi! I\'m your FusionKart AI assistant. Ask me about products, orders, or returns.' }
  ]);
  const [listening, setListening] = useState(false);
  const recogRef = useRef<SpeechRecognition | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  useEffect(() => {
    const AnyRecog = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (AnyRecog) {
      const r: SpeechRecognition = new AnyRecog();
      r.continuous = false; r.interimResults = false; r.lang = 'en-US';
      r.onresult = (e: SpeechRecognitionEvent) => {
        const transcript = Array.from(e.results).map(r => r[0].transcript).join(' ');
        setInput(transcript);
        setListening(false);
      };
      r.onend = () => setListening(false);
      r.onerror = () => setListening(false);
      recogRef.current = r;
    }
  }, []);

  const handleSend = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setMessages(prev => [...prev, { role: 'user', content: q }]);

    // Memory lookup (simple contains matching)
    const mem = getMemory();
    const remembered = mem.find(m => q.toLowerCase().includes(m.q.toLowerCase()) || m.q.toLowerCase().includes(q.toLowerCase()));

    // Simple intent handling: search, order, returns
    let reply = '';
    if (remembered) {
      reply = remembered.a;
    } else if (/order|status|track/i.test(q)) {
      reply = 'To check your order status, open Account > Orders, or tell me your order ID.';
    } else if (/return|refund/i.test(q)) {
      reply = 'You can initiate returns from Account > Orders within 7–30 days depending on the product.';
    } else if (/recommend|suggest|find|search/i.test(q)) {
      reply = searchProducts(q);
    } else {
      reply = 'I can help you search products, recommend items, and answer account questions. Try: "recommend wireless headphones under $100"';
    }

    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    addMemory({ q, a: reply });
    speak(reply);
    setInput("");
  };

  const toggleMic = async () => {
    if (!recogRef.current) return;
    if (!listening) {
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        recogRef.current.start();
        setListening(true);
      } catch {
        setListening(false);
      }
    } else {
      recogRef.current.stop();
      setListening(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="hero" size="icon" className="fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg" aria-label="Open chat">
          <MessageSquare />
          <span className="sr-only">Open chat</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>FusionKart AI Assistant</DialogTitle>
        </DialogHeader>
        <div className="flex h-[420px] flex-col rounded-md border bg-background">
          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div key={i} className={m.role === 'user' ? 'text-right' : 'text-left'}>
                <div className={
                  'inline-block max-w-[85%] rounded-md px-3 py-2 text-sm ' +
                  (m.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-foreground')
                }>
                  {m.content}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>
          <div className="flex items-center gap-2 border-t p-3">
            <Button variant={listening ? 'destructive' : 'secondary'} onClick={toggleMic} aria-pressed={listening}>
              {listening ? <MicOff /> : <Mic />} {listening ? 'Stop' : 'Speak'}
            </Button>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => { if (e.key === 'Enter') handleSend(); }}
            />
            <Button onClick={() => handleSend()} aria-label="Send"><Send /></Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotWidget;
