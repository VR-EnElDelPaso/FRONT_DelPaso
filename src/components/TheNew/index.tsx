import NewCard, { NewCardProps } from "./NewCard"
import { FadeInOnScroll } from '../animations/FadeInOnScroll';

const newCards: NewCardProps[] = [
  {
    title: "Recorrido virtual",
    description: "Conociendo el espacio de Fernando del Paso",
    imagePath: "/assets/images/pictures/pasillo.png"
  },
  {
    title: "Explora",
    description: "Túnel Central Fernando del Paso",
    imagePath: "/assets/images/pictures/tunel-central.png"
  },
  {
    title: "Expuesto ahora",
    description: "Teresa Olmedo: PALABRALMA",
    imagePath: "/assets/images/pictures/palabralma.jpeg"
  },
  {
    title: "Explora",
    description: "Doble altura Fernando del Paso",
    imagePath: "/assets/images/pictures/doble-altura.png"
  },
]


export default function TheNew() {
  return (
    <div className="font-kaiseiDecol">

      {/* imagen de decoración */}
      <div className="hidden sm:block h-96">
        <img
          src="/assets/images/pictures/pasillo.png"
          alt="imagen del pasillo del museo Fernando del paso"
          className="w-full h-full object-cover"
        />
      </div>
      {/* fin de imagen de decoración */}
      <FadeInOnScroll
        distance={20}
        duration={2}
      >
        <div className="mx-auto sm:py-8 px-8 py-4 container">
          {/* titulo */}
          <div className="mb-6">
            <h3 className="tracking-widest font-inter text-lg">
              • DESCUBRE
            </h3>
            <h2 className="text-2xl">Lo Nuevo</h2>
          </div>
          {/* fin de titulo */}

          {/* sm cards */}
          <div className="sm:hidden grid sm:grid-cols-2 grid-cols-1 gap-14">
            {newCards.map((newCard, index) => (
              <FadeInOnScroll
                key={index}
                distance={20}
                duration={2}
              >
                <NewCard key={index} {...newCard} />
              </FadeInOnScroll>
            ))}
          </div>
          {/* fin de sm cards */}

          {/* >sm cards */}
          <div className="hidden sm:block">
            <div className="hidden sm:grid sm:grid-cols-2 grid-cols-1 gap-8">
              {newCards.map((newCard, index) => (
                <NewCard key={index} {...newCard} />
              ))}
            </div>
          </div>
          {/* fin de cards */}
        </div>
      </FadeInOnScroll>
    </div>
  )
}
