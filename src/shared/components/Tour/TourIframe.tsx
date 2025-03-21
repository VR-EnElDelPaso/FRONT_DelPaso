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
      ></iframe>
      {isBlurred && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-white bg-black bg-opacity-50 cursor-pointer text-center h-[450px]"
          onClick={onStart}
        >
          <h2 className="font-semibold tracking-widest">SOLO EN MUVi</h2>
          <h1 className="mt-2 text-3xl font-medium md:text-5xl font-kaiseiDecol">
            Empezar este recorrido
          </h1>
        </div>
      )}
    </section>
  );
}
