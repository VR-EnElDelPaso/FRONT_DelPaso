import Carousel from "./Carousel";
import MuseumStatus from "./MuseumStatus";

export default function NowShowing() {
    return (
        <div className="container mx-auto">
            {/* MuseumStatus */}
            <div className="flex justify-end p-5">
                <MuseumStatus />
            </div>
            <div className="container mx-auto px-4 md:px-10 max-w-7xl">
                {/* Title */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <span className="text-3xl mr-2">•</span>
                        <p className="text-sm font-bold tracking-widest uppercase">Actuales</p>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-bold font-kaiseiDecol mt-2">Recorridos Virtuales</h1>
                </div>
                
                {/* Carousel */}
                <div className="flex-col md:flex-row p-4 mb-4">
                    <Carousel />
                </div>
            </div>
        </div>
    );
}