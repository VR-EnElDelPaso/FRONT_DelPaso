import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Building, Route, Image, HelpCircle, ChevronRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/shared/components/Loader";
import { getAllMuseums } from "@/services/Museums";
import { getAllTours } from "@/services/tour.services";
import { getAllFaqs } from "@/services/Faqs";
import { getMainCarousel } from "@/services/Carousel";

// Definición de las rutas de administración
const adminRoutes = [
  {
    id: "museums",
    path: "/admin/museums",
    title: "Gestión de Museos",
    description:
      "Administra museos, horarios, direcciones y ubicaciones en el mapa",
    icon: Building,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    features: [
      "Crear y editar museos",
      "Gestionar horarios",
      "Ubicaciones GPS",
      "Información de contacto",
    ],
  },
  {
    id: "tours",
    path: "/admin/tours",
    title: "Gestión de Tours",
    description: "Administra tours, precios, calificaciones y etiquetas",
    icon: Route,
    color: "text-green-600",
    bgColor: "bg-green-50",
    features: [
      "Crear nuevos tours",
      "Establecer precios",
      "Gestionar tags",
      "Calificaciones",
    ],
  },
  {
    id: "faqs",
    path: "/admin/faqs",
    title: "Preguntas Frecuentes",
    description: "Gestiona preguntas y respuestas para los usuarios",
    icon: HelpCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    features: [
      "Crear preguntas",
      "Editar respuestas",
      "Organizar contenido",
      "Soporte usuarios",
    ],
  },
  {
    id: "landing",
    path: "/admin/landing",
    title: "Landing Page",
    description:
      "Administra el carrusel principal y contenido de la página inicial",
    icon: Image,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    features: [
      "Carrusel principal",
      "Vista previa",
      "Gestión de slides",
      "Contenido multimedia",
    ],
  },
];

interface Stats {
  museums: number;
  tours: number;
  faqs: number;
  carouselSlides: number;
}

const AdminHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    museums: 0,
    tours: 0,
    faqs: 0,
    carouselSlides: 0,
  });
  const [loading, setLoading] = useState(true);

  // Función para cargar todas las estadísticas
  const loadStats = async () => {
    try {
      setLoading(true);

      // Cargar todas las estadísticas en paralelo
      const [museumsRes, toursRes, faqsRes, carouselRes] = await Promise.all([
        getAllMuseums(),
        getAllTours(),
        getAllFaqs(),
        getMainCarousel(),
      ]);

      setStats({
        museums: museumsRes.data?.length || 0,
        tours: toursRes.data?.length || 0,
        faqs: faqsRes.data?.length || 0,
        carouselSlides: carouselRes.data?.slides?.length || 0,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
      // En caso de error, mantener los valores en 0
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  // Definir las estadísticas usando los datos reales
  const statsData = [
    {
      label: "Total Museos",
      value: stats.museums.toString(),
      icon: Building,
      iconColor: "text-blue-600",
    },
    {
      label: "Tours Activos",
      value: stats.tours.toString(),
      icon: Route,
      iconColor: "text-green-600",
    },
    {
      label: "FAQs Disponibles",
      value: stats.faqs.toString(),
      icon: HelpCircle,
      iconColor: "text-purple-600",
    },
    {
      label: "Slides en Carrusel",
      value: stats.carouselSlides.toString(),
      icon: Image,
      iconColor: "text-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-6 flex justify-center items-center min-h-[400px]">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-6">
      {/* Header Principal */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-600 text-lg">
          Gestiona todos los aspectos de tu plataforma de museos
        </p>
      </div>

      {/* Estadísticas Rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsData.map((stat, index) => {
          const route = adminRoutes[index];
          return (
            <Card
              key={index}
              className="border-l-4 border-l-transparent hover:border-l-current transition-all duration-300 cursor-pointer hover:shadow-lg"
              onClick={() => navigate(route.path)}
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.iconColor}`} />
                </div>
                <div className="mt-3 text-right">
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-auto" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Cards de Navegación */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {adminRoutes.map((route) => (
          <Card
            key={route.id}
            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-0 shadow-md"
            onClick={() => navigate(route.path)}
          >
            <CardHeader className={`${route.bgColor} rounded-t-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white rounded-lg">
                    <route.icon className={`h-6 w-6 ${route.color}`} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{route.title}</CardTitle>
                    <CardDescription className="text-gray-700 mt-1">
                      {route.description}
                    </CardDescription>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-2">
                {route.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="h-1.5 w-1.5 bg-gray-400 rounded-full"></div>
                    <p className="text-sm text-gray-600">{feature}</p>
                  </div>
                ))}
              </div>
              <Button
                className="w-full mt-4 group-hover:bg-primary group-hover:text-white transition-all duration-300"
                variant="outline"
              >
                Acceder <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer con información adicional */}
      <div className="mt-8 text-center text-gray-500">
        <p className="text-sm">Panel de Administración - Gestión de Museos</p>
      </div>
    </div>
  );
};

export default AdminHome;
