import Loader from "@/shared/components/Loader";

interface TourIframeProps {
  src: string;
  isBlurred: boolean;
  onStart: () => void;
  isLoading?: boolean;
  onLoad?: () => void;
}

export default function TourIframe({
  src,
  isBlurred,
  onStart,
  isLoading = false,
  onLoad,
}: TourIframeProps) {
  return (
    <section className="relative">
      {src ? (
        <iframe
          className={`w-full transition-all duration-500 ${
            isBlurred
              ? "blur-md opacity-50 h-[450px]"
              : "blur-0 opacity-100 h-[640px]"
          }`}
          frameBorder="0"
          name="tour-iframe"
          title="tour-iframe"
          allow="xr-spatial-tracking; gyroscope; accelerometer"
          allowFullScreen
          scrolling="no"
          src={src}
          onLoad={onLoad}
        ></iframe>
      ) : (
        <div className={`w-full h-[450px] bg-gray-100`}></div>
      )}

      {isBlurred && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 cursor-pointer text-center h-[450px]"
          onClick={isLoading ? undefined : onStart}
        >
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader />
              <p className="mt-4">Cargando recorrido...</p>
            </div>
          ) : (
            <>
              <h2 className="font-semibold tracking-widest">SOLO EN MUVi</h2>
              <h1 className="mt-2 text-3xl font-medium md:text-5xl font-kaiseiDecol">
                Empezar este recorrido
              </h1>
            </>
          )}
        </div>
      )}
    </section>
  );
}
