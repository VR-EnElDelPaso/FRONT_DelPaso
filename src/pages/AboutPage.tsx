import { Button } from "@/components/ui/button";

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 pt-4">
      <div className="flex flex-col">
        {/* Título principal */}
        <h1 className="font-kaiseiDecol text-4xl md:text-6xl lg:text-[6rem] text-[#333]">
          Sobre <span className="uppercase">Muvi</span>
        </h1>

        {/* Divider rojo */}
        <div className="w-full border-b border-primary my-8 md:my-12 lg:my-[3rem]"></div>

        {/* Descripciones */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-0 mb-8 md:mb-12 lg:mb-[3rem]">
          <div className="flex flex-col gap-4 lg:w-1/2">
            {/* Izquierda */}
            <div>
              <p className="text-sm md:text-base">
                "MUVI, una experiencia que lleva el arte y la cultura de
                nuestros museos
              </p>
              <p className="text-sm md:text-base">
                directamente hasta la comodidad de tu hogar."
              </p>
            </div>
            <div>
              <p className="font-bold text-sm md:text-base">MUVI</p>
              <p className="text-sm md:text-base">creando experiencias.</p>
            </div>
          </div>
          <div className="leading-tight lg:w-1/2">
            {/* Derecha */}
            <p className="text-sm md:text-base">
              MUVI es un proyecto que busca acercar el arte, la cultura y el
              conocimiento a todas
            </p>
            <p className="text-sm md:text-base">
              las personas a través de recorridos virtuales inmersivos. Surge
              como una iniciativa
            </p>
            <p className="text-sm md:text-base">
              de la Universidad de Colima para dar mayor visibilidad a sus
              museos y exposiciones,
            </p>
            <p className="text-sm md:text-base">
              permitiendo que cualquier persona, sin importar dónde se
              encuentre, pueda
            </p>
            <p className="text-sm md:text-base">
              explorarlos desde la comodidad de su casa.
            </p>
          </div>
        </div>

        {/* Palabras con separadores */}
        <div className="flex flex-col md:flex-row w-full md:divide-x divide-primary divide-solid gap-4 md:gap-0">
          <div className="flex-1 flex items-center justify-center md:justify-start px-0 md:px-4">
            <div className="text-center md:text-left">
              <p className="text-sm md:text-base">Explora museos</p>
              <p className="text-sm md:text-base">sin salir de casa</p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-0 md:px-4">
            <div className="text-center">
              <p className="text-sm md:text-base">Recorridos virtuales</p>
              <p className="text-sm md:text-base">con vistas 360º</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-0 md:px-4">
            <div className="text-center">
              <p className="text-sm md:text-base">Acceso libre al</p>
              <p className="text-sm md:text-base">arte universitario</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-0 md:px-4">
            <div className="text-center">
              <p className="text-sm md:text-base">Conecta cultura y</p>
              <p className="text-sm md:text-base">tecnología en línea</p>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center px-0 md:px-4">
            <div className="text-center">
              <p className="text-sm md:text-base">Descubre exposiciones</p>
              <p className="text-sm md:text-base">desde cualquier lugar</p>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-center px-0 md:px-4">
            <div className="text-center">
              <p className="text-sm md:text-base">Vive el arte de</p>
              <p className="text-sm md:text-base">forma interactiva</p>
            </div>
          </div>
        </div>

        {/* Imagen */}
        <div className="mt-8 md:mt-12 lg:mt-[3rem]">
          <img
            src="/assets/images/pictures/pasillo.png"
            alt="Logo de MUVi"
            className="w-full h-[250px] md:h-[350px] lg:h-[430px] object-cover"
          />
        </div>

        {/* Descripciones segunda sección */}
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-0 mt-8 md:mt-12 lg:mt-[3rem] mb-8 md:mb-12 lg:mb-[3rem]">
          <div className="flex flex-col gap-4 lg:w-1/2">
            {/* Izquierda */}
            <div>
              <p className="text-sm md:text-base">
                "MUVI, una experiencia que lleva el arte y la cultura de
                nuestros museos
              </p>
              <p className="text-sm md:text-base">
                directamente hasta la comodidad de tu hogar."
              </p>
            </div>
            <div>
              <p className="font-bold text-sm md:text-base">MUVI</p>
              <p className="text-sm md:text-base">creando experiencias.</p>
            </div>
          </div>
          <div className="leading-tight lg:w-1/2">
            {/* Derecha */}
            <p className="text-sm md:text-base">
              MUVI es un proyecto que busca acercar el arte, la cultura y el
              conocimiento a todas
            </p>
            <p className="text-sm md:text-base">
              las personas a través de recorridos virtuales inmersivos. Surge
              como una iniciativa
            </p>
            <p className="text-sm md:text-base">
              de la Universidad de Colima para dar mayor visibilidad a sus
              museos y exposiciones,
            </p>
            <p className="text-sm md:text-base">
              permitiendo que cualquier persona, sin importar dónde se
              encuentre, pueda
            </p>
            <p className="text-sm md:text-base">
              explorarlos desde la comodidad de su casa.
            </p>
          </div>
        </div>

        {/* Sobre */}
        <div className="flex flex-col gap-6 md:gap-8">
          {/* Título */}
          <div className="flex items-center">
            <span className="text-xl mr-2 text-primary">•</span>
            <p className="text-base font-bold text-primary tracking-widest uppercase">
              Sobre
            </p>
          </div>

          {/* Descripción */}
          <div className="flex flex-col w-full gap-4 md:gap-6">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-kaiseiDecol">
              Conoce MUVi
            </h1>
            <p className="w-full font-light text-sm md:text-base leading-relaxed">
              MUVi está diseñado para brindarte las experiencias más
              excepcionales y envolventes en Recorridos Virtuales, ofreciéndote
              una forma innovadora y accesible de explorar diversos espacios
              culturales, históricos o comerciales desde la comodidad de tu
              hogar o desde cualquier lugar del mundo
            </p>
          </div>

          {/* Galería */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-5 h-auto lg:h-[541px] mt-4 md:mt-6 mb-16 md:mb-20 lg:mb-24">
            {/* Imagen 1 */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>

            {/* Imagen 2 */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>

            {/* Imagen 3 - Vertical */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2 lg:row-span-2">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[250px] md:h-[300px] lg:h-full object-cover rounded-lg"
              />
            </div>

            {/* Imagen 4 - Segunda fila, ocupa 4 columnas en desktop */}
            <div className="col-span-2 md:col-span-4 lg:col-span-4">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>

            {/* Imagen 5 */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>

            {/* Imagen 6 */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>

            {/* Imagen 7 */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>

            {/* Imagen 8 - Ocupa 3 columnas */}
            <div className="col-span-2 md:col-span-3 lg:col-span-3">
              <img
                src="/Museo-Fernando-del-Paso.jpg"
                alt="Museo Fernando del Paso"
                className="w-full h-[150px] md:h-[200px] lg:h-[258px] object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Ayuda */}
          <div className="w-full px-0 md:px-4 py-12 md:py-16 lg:py-20 mt-16 md:mt-24 lg:mt-40">
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-primary" />
                <h3 className="text-sm md:text-base font-bold tracking-widest uppercase text-primary">
                  Ayuda
                </h3>
              </div>

              <h2 className="text-2xl md:text-4xl lg:text-[3rem] font-bold font-kaiseiDecol">
                ¿Tienes preguntas?
              </h2>

              <p className="text-sm md:text-base leading-7 text-muted-foreground">
                Si tienes alguna duda sobre nuestras exposiciones, horarios,
                entradas u otros servicios, por favor visita nuestra sección de
                preguntas frecuentes o contáctanos directamente a través de
                contacto@muvi.com o llamando al +52 333 123 4567. Estamos aquí
                para ayudarte a disfrutar de tu visita al Museo Fernando del
                Paso.
              </p>

              <div className="flex justify-center md:justify-end pt-4">
                <Button
                  variant="default"
                  size="lg"
                  className="font-medium text-white rounded-xl w-full md:w-auto"
                >
                  Ayuda
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
