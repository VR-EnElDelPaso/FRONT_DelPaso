import Carousel from "./Carousel";
import MuseumStatus from "./MuseumStatus";

export default function NowShowing() {
    return (
        <div className="relative flex flex-col">
            <div className="absolute top-3 right-3">
                <MuseumStatus />
            </div>
            <div className="p-20">
                <div className="flex items-center">
                    <span className="text-3xl mr-2">•</span>
                    <p className="text-sm font-bold tracking-widest uppercase">Actuales</p>
                </div>
                <h1 className="text-3xl font-bold font-serif">Recorridos Virtuales</h1>
            <Carousel />
            </div>
        </div>
    );
}
