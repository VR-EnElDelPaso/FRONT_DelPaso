import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export default function StatsSection() {
  // Detect when the section is in view
  const { ref, inView } = useInView({
    triggerOnce: true, // se dispara solo una vez
    threshold: 0.2 // se dispara cuando el 20% del elemento está en el viewport
  });

  // State to count the stats
  const [counts, setCounts] = useState({
    years: 0,
    exhibitions: 0,
    collaborators: 0
  });

  // Increment the stats when the section is in view
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (inView) {
      interval = setInterval(() => {
        setCounts(prev => ({
          years: prev.years < 20 ? prev.years + 1 : prev.years,
          exhibitions: prev.exhibitions < 10 ? prev.exhibitions + 1 : prev.exhibitions,
          collaborators: prev.collaborators < 40 ? prev.collaborators + 1 : prev.collaborators
        }));
      }, 50);
    }
    return () => clearInterval(interval);
  }, [inView]);

  return (
    <div className="hidden sm:block h-[600px] relative">
      <img
        src="/assets/images/pictures/stats.jpg"
        alt="interior del museo"
        className="w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/70">
        <div className="container mx-auto h-full flex flex-col justify-between py-32 px-4 sm:px-6 md:px-8">
          {/* Title and description */}
          <div className="flex justify-between items-center gap-8">
            <div className="w-1/3">
              <h2 className="text-3xl font-kaiseiDecol font-light text-white tracking-widest uppercase">
                Te interesará
              </h2>
            </div>
            <div className="w-2/3">
              <div className="flex flex-col gap-4 text-right">
                <p className="text-white font-inter text-md">
                  <span className="font-bold">El museo Universitario Fernando del Paso</span>
                  {" "}cuenta con diversas actividades como con exposiciones, eventos y festivales.
                </p>
                <p className="text-white font-inter text-md">
                  Somos el mejor museo de arte emergente en Colima, nuestros datos nos respaldan.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center mt-8" ref={ref}>
            <div className="grid grid-cols-3 gap-16 uppercase">
              <div className="flex flex-col items-center gap-2 transition-all duration-500 hover:transform hover:scale-105">
                <h3 className="text-7xl font-outfit font-black text-white">
                  {counts.years}
                </h3>
                <p className="text-white font-outfit text-md tracking-wider">
                  Años de experiencia
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 transition-all duration-500 hover:transform hover:scale-105">
                <h3 className="text-7xl font-outfit font-black text-white">
                  {counts.exhibitions}
                </h3>
                <p className="text-white font-outfit text-md tracking-wider">
                  Exposiciones realizadas
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 transition-all duration-500 hover:transform hover:scale-105">
                <h3 className="text-7xl font-outfit font-black text-white">
                  {counts.collaborators}
                </h3>
                <p className="text-white font-outfit text-md tracking-wider">
                  Colaboradores
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}