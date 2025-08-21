import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true); // start as true
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const fetchSessionAndProfile = async () => {
      setLoading(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();

        if (error) {
          console.error("Error fetching profile:", error);
        }

        setProfile(data || null);
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    fetchSessionAndProfile();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);

        if (session) {
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(data || null);
        } else {
          setProfile(null);
        }
      }
    );

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === "ADMIN",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);