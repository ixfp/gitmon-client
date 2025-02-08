import { useCallback, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import debounce  from "lodash.debounce";

import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@components/ui/form";

type FormValues = {
  repoName: string;
};

export default function CreateRepoInput() {
  const form = useForm<FormValues>({
    defaultValues: { repoName: "" },
  });

  const {
    handleSubmit,
    setError,
    clearErrors,
    formState: { isSubmitting, errors },
  } = form;

  const [isChecking, setIsChecking] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(true);

  const checkDuplicateRepo = async (repo: string) => {
    console.log(`Checking repo name: ${repo}`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return false; // TODO: 실제 API 연동 필요
  };

  const debouncedCheck = useRef(
    debounce(async (repo: string) => {
      const isDup = await checkDuplicateRepo(repo);
      setIsDuplicate(isDup);
      setIsChecking(false);
  
      if (repo === '') {
        setError('repoName', { type: 'minLength', message: "사용할 레포지토리의 이름을 입력해주십시오" });
      } else if (isDup) {
        setError("repoName", { type: "manual", message: "이미 존재하는 레포지토리입니다." });
      } else {
        clearErrors("repoName");
      }
    }, 1000)
  ).current;
  
  const handleRepoChange = useCallback((repo: string) => {
    setIsChecking(true);
    debouncedCheck(repo);
  }, []);

  const handleSubmitRepo = (data: FormValues) => console.log("Submitting repo:", data.repoName)

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(handleSubmitRepo)} className="space-y-4">
        <FormField
          control={form.control}
          name="repoName"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex gap-2">
                  <Input
                    {...field}
                    placeholder="새 레포지토리 이름"
                    className="w-full"
                    onChange={(e) => {
                      field.onChange(e);
                      handleRepoChange(e.target.value);
                    }}
                  />
                  <Button type="submit" disabled={isChecking || isSubmitting || isDuplicate || !!errors.repoName}>
                    생성
                  </Button>
                </div>
              </FormControl>
              {isChecking && <p className="text-sm text-gray-500">중복 확인 중...</p>}
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
