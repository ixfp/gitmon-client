// app/pages/SetRepositoryName.tsx (or SetRepositoryName.jsx)
'use client';

import { useState } from 'react';
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
// import { Card, CardContent } from "@components/ui/card";
import { Label } from "@components/ui/label";
import { useMutation } from '@tanstack/react-query';

export default function SetRepositoryName() {
  const [repoName, setRepoName] = useState('');
  const [error, setError] = useState('');

  const { mutate } = useMutation({
    mutationFn: async (repoName: string) => {
      const response = await fetch("https://api.gitmon.blog/api/v1/member/repo", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: repoName }),
      });
      
      if (response.ok) {
        const res = new Response(response.body)
        const data = await res.json();
        return data
      }
    },
    onSuccess: (data) => {
        const { userName = 123 } = data
        window.location.href = `/blog/${userName}`
    },
    onError: (error) => {
      console.error("Authentication failed:", error);
    },
  });

  const handleSubmit = () => {
    if (!/^[a-zA-Z0-9-_]+$/.test(repoName)) {
      setError("레포지토리 이름은 영어, 숫자, 하이픈(-), 언더스코어(_)만 사용할 수 있어요.");
      return;
    }
    setError('');
    mutate(repoName)

    alert(`"${repoName}" 이름으로 설정되었습니다.`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md shadow-xl">
        <div className="space-y-6 p-6">
          <div>
            <h1 className="text-2xl font-semibold mb-1">레포지토리 이름 설정</h1>
            <p className="text-sm text-gray-500">
              사용할 깃헙 레포지토리 이름을 입력해주세요.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="repo-name">레포지토리 이름</Label>
            <Input
              id="repo-name"
              placeholder="예: my-awesome-project"
              value={repoName}
              onChange={(e) => setRepoName(e.target.value)}
            />
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            저장하기
          </Button>
        </div>
      </div>
    </div>
  );
}
