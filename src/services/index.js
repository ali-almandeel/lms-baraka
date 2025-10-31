import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import api from "./api";

export function useGetListService({ url, isEnable = true, onSuccess }) {
  return useQuery({
    queryKey: [url + "-list"],
    queryFn: async () => {
      const result = await api.get(url);
      onSuccess && onSuccess(result.data);
      return result.data;
    },
    enabled: isEnable,
    refetchOnWindowFocus: true,
    staleTime: 1000 * 60 * 10,
  });
}

export function useGetByIdService({
  url,
  id,
  options,
  isEnabled = true,
  onSuccess,
}) {
  return useQuery({
    queryKey: [url + "-id", id],
    queryFn: async () => {
      const result = await api.get(`${url}/${id}`, { params: options });
      onSuccess && onSuccess(result.data);
      return result.data;
    },
  });
}

export function useCreateService({ url, onSuccess, onError, urlAfterSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const result = await api.post(url, data);
      return result.data;
    },
    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
      if (urlAfterSuccess) {
        await queryClient.invalidateQueries([urlAfterSuccess + "-list"]);
      }
    },
    onError: (error) => {
      console.error(error);
      onError && onError(error);
    },
  });
}

export function useUpdateService({ url, onSuccess, onError, urlAfterSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      const result = await api.patch(`${url} / ${data.id}`, data);
      return result.data;
    },
    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
      if (urlAfterSuccess) {
        await queryClient.invalidateQueries([urlAfterSuccess + "-list"]);
      }
    },
    onError: (error) => {
      console.error(error);
      onError && onError(error);
    },
  });
}

export function useDeleteService({ url, onSuccess, onError, urlAfterSuccess }) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id) => {
      const result = await api.delete(`${url} / ${id}`);
      return result.data;
    },
    onSuccess: async (data) => {
      onSuccess && onSuccess(data);
      if (urlAfterSuccess) {
        await queryClient.invalidateQueries([urlAfterSuccess + "-list"]);
      }
    },
    onError: (error) => {
      console.error(error);
      onError && onError(error);
    },
  });
}