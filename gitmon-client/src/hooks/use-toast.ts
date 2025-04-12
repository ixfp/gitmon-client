import { useCallback } from "react";
import { toast } from "sonner";

const useToast = () => {
  const showToast = useCallback((message: string) => {
    toast(message, {});
  }, []);

  return { showToast };
};

export default useToast;
