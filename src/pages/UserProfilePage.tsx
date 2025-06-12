// src/pages/UserProfilePage.tsx
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  getUserProfile,
  updateUserProfile,
} from "@/services/user-profile.services";
import { toast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { UserType } from "@/types/user";
import useAuthStore from "@/stores/AuthStore";
import { Edit } from "lucide-react";
import User from "@/types/user";

// Schema de validación
const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters"),
  first_lastname: z
    .string()
    .min(1, "First lastname is required")
    .min(2, "First lastname must be at least 2 characters"),
  second_lastname: z
    .string()
    .min(1, "Second lastname is required")
    .min(2, "Second lastname must be at least 2 characters"),
});

type UpdateProfileData = z.infer<typeof updateProfileSchema>;

export default function UserProfilePage() {
  const { user } = useAuth();
  const { getUserInitials, updateUser } = useAuthStore();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [currentUserData, setCurrentUserData] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: "",
      first_lastname: "",
      second_lastname: "",
    },
  });

  // Función para obtener los datos frescos del perfil
  const fetchUserProfile = useCallback(async () => {
    if (!user?.id) return;

    try {
      const response = await getUserProfile();
      if (response.ok) {
        setCurrentUserData(response.data);
        // Actualizar también el store para mantener consistencia
        updateUser(response.data);
        // Actualizar el formulario con los datos frescos
        reset({
          name: response.data.name || "",
          first_lastname: response.data.first_lastname || "",
          second_lastname: response.data.second_lastname || "",
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  }, [user?.id, updateUser, reset]);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Cargar datos iniciales del formulario desde currentUserData
  useEffect(() => {
    if (currentUserData) {
      reset({
        name: currentUserData.name || "",
        first_lastname: currentUserData.first_lastname || "",
        second_lastname: currentUserData.second_lastname || "",
      });
    }
  }, [currentUserData, reset]);

  const onSubmit = async (data: UpdateProfileData) => {
    if (!currentUserData) return;

    setIsLoading(true);
    try {
      // Incluir display_name actualizado basado en los nuevos datos
      const updateData = {
        ...data,
        display_name: `${data.name} ${data.first_lastname}`,
      };

      const response = await updateUserProfile(updateData);

      if (response.ok) {
        // Actualizar el estado local con los datos frescos del backend
        setCurrentUserData(response.data);

        // Actualizar el store para mantener consistencia
        updateUser(response.data);

        // Actualizar el formulario con los nuevos datos
        reset({
          name: response.data.name,
          first_lastname: response.data.first_lastname,
          second_lastname: response.data.second_lastname,
        });

        toast({
          title: t("Success"),
          description: t("Profile updated successfully"),
          variant: "default",
        });
      }
    } catch (error: unknown) {
      console.error("Error updating profile:", error);

      let errorMessage = t("Failed to update profile");

      if (error instanceof Error) {
        errorMessage = error.message;
      }

      toast({
        title: t("Error"),
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderAvatar = () => {
    const userData = currentUserData || user;

    if (userData?.image) {
      return (
        <img
          src={userData.image}
          alt={userData.display_name}
          className="w-32 h-32 rounded-full object-cover"
        />
      );
    }

    const initials = getUserInitials();
    return (
      <div className="w-32 h-32 rounded-full bg-primary text-white flex items-center justify-center text-4xl font-bold">
        {initials || "👤"}
      </div>
    );
  };

  if (!user || !currentUserData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="text-center">
            <p className="text-gray-500">{t("Loading user profile...")}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="bg-white shadow-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Avatar */}
              <div className="flex justify-center mb-8">{renderAvatar()}</div>

              {/* Email y Número de cuenta */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Email */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-gray-600">
                    {t("Email")}
                  </Label>
                  <Input
                    value={currentUserData.email}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                {/* Número de cuenta - Solo visible para STUDENT y WORKER */}
                {(currentUserData.role === UserType.STUDENT ||
                  currentUserData.role === UserType.WORKER) && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-gray-600">
                      {t("Account Number")}
                    </Label>
                    <Input
                      value={currentUserData.account_number || "N/A"}
                      readOnly
                      className="bg-gray-50"
                    />
                  </div>
                )}
              </div>

              {/* Nombre */}
              <div className="space-y-2">
                <Label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-600"
                >
                  {t("First Name")}
                </Label>
                <div className="relative">
                  <Input
                    id="name"
                    type="text"
                    {...register("name")}
                    className={`pr-10 ${errors.name ? "border-red-500" : ""}`}
                  />
                  <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>

              {/* Primer Apellido */}
              <div className="space-y-2">
                <Label
                  htmlFor="first_lastname"
                  className="text-sm font-medium text-gray-600"
                >
                  {t("First Last Name")}
                </Label>
                <div className="relative">
                  <Input
                    id="first_lastname"
                    type="text"
                    {...register("first_lastname")}
                    className={`pr-10 ${
                      errors.first_lastname ? "border-red-500" : ""
                    }`}
                  />
                  <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.first_lastname && (
                  <p className="text-sm text-red-600">
                    {errors.first_lastname.message}
                  </p>
                )}
              </div>

              {/* Segundo Apellido */}
              <div className="space-y-2">
                <Label
                  htmlFor="second_lastname"
                  className="text-sm font-medium text-gray-600"
                >
                  {t("Second Last Name")}
                </Label>
                <div className="relative">
                  <Input
                    id="second_lastname"
                    type="text"
                    {...register("second_lastname")}
                    className={`pr-10 ${
                      errors.second_lastname ? "border-red-500" : ""
                    }`}
                  />
                  <Edit className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                {errors.second_lastname && (
                  <p className="text-sm text-red-600">
                    {errors.second_lastname.message}
                  </p>
                )}
              </div>

              {/* Botones de acción */}
              <div className="flex justify-center space-x-4 pt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  disabled={!isDirty || isLoading}
                  className="px-8"
                >
                  {t("Cancel")}
                </Button>
                <Button
                  type="submit"
                  disabled={!isDirty || isLoading}
                  className="px-8"
                >
                  {isLoading ? t("Updating...") : t("Update Profile")}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
