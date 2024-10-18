interface TourIframeProps {
  src: string;
  isBlurred: boolean;
  onStart: () => void;
}

export default function TourIframe({
  src,
  isBlurred,
  onStart,
}: TourIframeProps) {
  return (
    <section className="relative">
      <iframe
        className={`transition-opacity duration-500 ${
          isBlurred ? "blur-md opacity-50" : "blur-0 opacity-100"
        }`}
        width="100%"
        height="640"
        frameBorder="0"
        allow="xr-spatial-tracking; gyroscope; accelerometer"
        allowFullScreen
        scrolling="no"
        src={src}
      ></iframe>
      {isBlurred && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 cursor-pointer text-center"
          onClick={onStart}
        >
          <h2 className="font-semibold tracking-widest">SOLO EN MUVi</h2>
          <h1 className="text-3xl md:text-5xl font-medium font-kaiseiDecol mt-2">
            Empezar este recorrido
          </h1>
        </div>
      )}
    </section>
  );
}
