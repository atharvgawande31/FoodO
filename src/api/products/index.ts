import {
  useQuery,
  useMutation,
  useQueryClient,
  Query,
} from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Product } from "@/types";

export const useProductList = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useProduct = (id: number) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};



export const useInsertProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: Omit<Product, 'id'>) {
      const { error } = await supabase.from('products').insert({
        name: data.name,
        price: data.price,
        image: data.image,
      });

      if (error) {
        throw error;
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ['products'] });
    },
    onError(error) {
      console.log(error);
    },
  });
};