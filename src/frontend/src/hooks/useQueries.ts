import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Inquiry, ServiceType } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllInquiries() {
  const { actor, isFetching } = useActor();
  return useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInquiries();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSubmitInquiry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      name,
      email,
      phone,
      serviceType,
      message,
    }: {
      name: string;
      email: string;
      phone: string | null;
      serviceType: ServiceType;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitInquiry(name, email, phone, serviceType, message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });
}

export { ServiceType };
