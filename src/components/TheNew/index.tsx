export default function TheNew() {
  return (
    <div className="block h-[300px] sm:h-[400px] md:h-[500px] relative">
      <img 
        src="/assets/images/pictures/pasillo.png" 
        alt="Imagen del pasillo del museo Fernando del Paso" 
        className="w-full h-full object-cover"  
      />

      <div className="absolute inset-0 bg-black/40">
        <div className="container mx-auto flex flex-col justify-center translate-y-8 sm:translate-y-10 md:translate-y-12 h-full px-4 sm:px-6 md:px-8">
          <h2 className="text-white font-kaiseiDecol text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-xl sm:max-w-2xl mb-2 sm:mb-4">
            Visita nuestras instalaciones desde tu casa
          </h2>
          <div className="flex items-center">
            <span className="text-lg sm:text-xl mr-2 text-white">•</span>
            <p className="text-xs sm:text-sm font-inter font-medium text-white tracking-widest uppercase">
              Más información
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}