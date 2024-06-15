import { useState, useEffect } from "react";

import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Lover {
  github_username: string;
  avatar_url: string;
}

export const useReactLovers = () => {
  const [lovers, setLovers] = useState<Lover[]>([]);

  useEffect(() => {
    (async () => {
      const result = await supabase
        .from("react_lovers")
        .select("github_username, avatar_url");
      if (!result.data) return;
      setLovers(result.data);
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
          setLovers((l) => [...l, payload.new as Lover]);
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
      setLovers(l => [...l, {avatar_url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg', github_username}]);
      // const res = await fetch(
      //   `https://api.github.com/users/${github_username}`
      // );

      // if (res.status === 404) {
      //   return;
      // }

      // const { avatar_url } = await res.json();
      // const { error } = await supabase
      //   .from("react_lovers")
      //   .insert({ github_username, avatar_url });
      // if (error) {
      //   console.error(error);
      // }
    },
  };
};
