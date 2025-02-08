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
      // 신규 가입 및 등록된 repo가 없으면 repo 생성 페이지로 이동
      // 추후엔 등록된 repo의 여부에 따라 분기 처리해야함
      window.location.href = `/${data}/create-repo`;
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
