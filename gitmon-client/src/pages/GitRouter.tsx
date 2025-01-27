import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const GitRouter = () => {
  const [searchParams] = useSearchParams();

  const mutation = useMutation({
    mutationFn: async (code: string) => {
      console.log(code);
      return code;
      //   const response = await fetch("대충 서버주소", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ code }),
      //   });

      //   if (response.ok) {
      //     return response.json();
      //   }
    },
    onSuccess: (data) => {
      console.log(data);
      window.location.href = `/tempBlog/${data}`;
    },
    onError: (error: any) => {
      console.error("Authentication failed:", error);
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      mutation.mutate(code);
    }
  }, [searchParams, mutation]);

  return <div>Authenticating...</div>;
};

export default GitRouter;
