import { useFetchMuseums } from "@/features/museum/museum.querys";
import { useFetchTours } from "@/features/tour/tour.querys";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function StatsSection() {
  const { data: museumsResponse } = useFetchMuseums();
  const { data: toursResponse } = useFetchTours();
  const museumsCount = museumsResponse?.data?.length || 0;
  const toursCount = toursResponse?.data?.length || 0;

  // Detect when the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // se dispara solo una vez
    threshold: 0.2, // se dispara cuando el 20% del elemento está en el viewport
  });

  // State to count the stats
  const [counts, setCounts] = useState({
    museums: 0,
    tours: 0,
  });

  // Increment the stats when the section is in view
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inView) {
      interval = setInterval(() => {
        setCounts((prev) => ({
          museums: prev.museums < museumsCount ? prev.museums + 1 : prev.museums,
          tours: prev.tours < toursCount ? prev.tours + 1 : prev.tours,
        }));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [inView, museumsCount, toursCount]);

  return (
    <div className="hidden sm:block h-[400px] relative">
      <img
        src="/assets/images/pictures/stats.jpg"
        alt="interior del museo"
        className="object-cover object-center w-full h-full"
      />
      <div className="absolute inset-0 bg-black/70">
        <div className="container flex flex-col justify-between h-full px-4 py-32 mx-auto sm:px-6 md:px-8">
          {/* Title and description */}
          <div className="flex items-center justify-between gap-8">
            <div className="w-1/3">
              <h2 className="text-3xl font-light tracking-widest text-white uppercase font-kaiseiDecol">
                Te interesará
              </h2>
            </div>
            <div className="w-2/3">
              <div className="flex flex-col gap-4 text-right">
                <p className="text-white font-inter text-md">
                  <span className="font-bold">MUVI</span> cuenta con diversos
                  museos y recorridos para que disfrutes de la mejor experiencia cultural.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center mt-8" ref={ref}>
            <div className="grid grid-cols-2 gap-24 uppercase">
              <div className="flex flex-col items-center gap-2 transition-all duration-500 hover:transform hover:scale-105">
                <h3 className="font-black text-white text-7xl font-outfit">
                  {counts.museums}
                </h3>
                <p className="tracking-wider text-white font-outfit text-md">
                  Museos disponibles
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 transition-all duration-500 hover:transform hover:scale-105">
                <h3 className="font-black text-white text-7xl font-outfit">
                  {counts.tours}
                </h3>
                <p className="tracking-wider text-white font-outfit text-md">
                  Recorridos disponibles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}