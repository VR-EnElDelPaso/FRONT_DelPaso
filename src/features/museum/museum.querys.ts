import { getAllMuseums, getMuseumById } from "@/services/Museums";
import { useQuery } from "@tanstack/react-query";

// Keys para las consultas
export const QUERY_KEYS = {
  museums: "museums",
  museum: "museum",
};

/**
 * Hook para obtener todos los museos
 * @returns Consulta con la lista de museos
 */
export const useFetchMuseums = (focusRefetch = false) => {
  return useQuery({
    queryKey: [QUERY_KEYS.museums],
    queryFn: getAllMuseums,
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: focusRefetch,
  });
};

/**
 * Hook para obtener un museo por ID
 * @param id ID del museo
 * @returns Consulta con los datos del museo
 */
export const useFetchMuseumById = (id: string | undefined) => {
  return useQuery({
    queryKey: [QUERY_KEYS.museum, id],
    queryFn: () => (id ? getMuseumById(id) : Promise.reject("ID no válido")),
    enabled: !!id, // Solo ejecutar si hay un ID
    staleTime: 5 * 60 * 1000, // 5 minutos
    refetchOnWindowFocus: false,
  });
};