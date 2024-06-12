import { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export const useReactLovers = () => {
  const [lovers, setLovers] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const result = await supabase
        .from("react_lovers")
        .select("github_username");
      if (!result.data) return;
      setLovers(result.data.map((d) => d.github_username as string));
    })();
  }, []);

  useEffect(() => {
    const subscription = supabase
      //
      .channel("table-db-changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          table: "react_lovers",
          schema: "public",
        },
        (payload) => {
          setLovers((l) => [...l, payload.new.github_username]);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  return {
    lovers,
    addLover: async (github_username: string) => {
      const { error } = await supabase
        .from("react_lovers")
        .insert({ github_username });
      console.log(error);
    },
  };
};
