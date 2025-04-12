'use client'

import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const GitRouter = () => {
  const searchParams = useSearchParams();

  const { mutate } = useMutation({
    mutationFn: async (code: string) => {
      const response = await fetch("https://api.gitmon.blog/api/v1/login/oauth/github/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      
      if (response.ok) {
        const res = new Response(response.body)
        const data = await res.json();
        return data
      }
    },
    onSuccess: (data) => {
      const { accessToken, isRepoCreated} = data
      // 신규 가입 및 등록된 repo가 없으면 repo 생성 페이지로 이동
      // 추후엔 등록된 repo의 여부에 따라 분기 처리해야함

      // accessToken을 ssr에서 어떻게 다룰 것인가?
      // 일단은 로컬 스토리지에 저장
      document.cookie = `github_token=${accessToken}; path=/; secure`;
      window.localStorage.setItem('token', accessToken)

      if (!isRepoCreated) {
        window.location.href = `/create-repo`;
      } else {
        window.location.href = `/blog/123`
      }
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    if (code) {
      mutate(code);
    }
  }, [searchParams, mutate])
    
  return <div>Authenticating...</div>;
};

export default GitRouter;
