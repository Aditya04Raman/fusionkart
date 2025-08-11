import SEO from "@/components/common/SEO";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { cleanupAuthState } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";

const Auth = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setTimeout(() => {
          window.location.href = '/';
        }, 0);
      }
    });
    supabase.auth.getSession();
    return () => subscription.unsubscribe();
  }, []);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      cleanupAuthState();
      try { await supabase.auth.signOut({ scope: 'global' }); } catch {}

      if (mode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: 'Welcome back', description: 'You are now signed in.' });
        window.location.href = '/';
      } else {
        const redirectUrl = `${window.location.origin}/`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl }
        });
        if (error) throw error;
        toast({ title: 'Check your email', description: 'Confirm your signup to continue.' });
      }
    } catch (err: any) {
      toast({ title: 'Authentication failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-6 max-w-md">
      <SEO title="Login / Sign Up — FusionKart AI" description="Access your FusionKart AI account." canonical="/auth" />
      <h1 className="mb-4 text-2xl font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h1>
      <form onSubmit={handleAuth} className="space-y-3">
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <Button type="submit" variant="hero" disabled={loading}>{loading ? 'Please wait…' : (mode === 'login' ? 'Login' : 'Sign Up')}</Button>
      </form>
      <p className="mt-3 text-sm text-muted-foreground">
        {mode === 'login' ? (
          <>
            No account? <button className="story-link" onClick={() => setMode('signup')}>Create one</button>
          </>
        ) : (
          <>
            Have an account? <button className="story-link" onClick={() => setMode('login')}>Login</button>
          </>
        )}
      </p>
    </main>
  );
};

export default Auth;
