import Carousel from "./Carousel";
import MuseumStatus from "./MuseumStatus";

export default function NowShowing() {
    return (
        <div className="relative flex flex-col">
            <div className="absolute top-3 right-3">
                <MuseumStatus />
            </div>
            <div className="sm:p-40 sm:pl-52">
                <div className="flex items-center">
                    <span className="text-3xl mr-2">•</span>
                    <p className="text-sm font-bold tracking-widest uppercase">Actuales</p>
                </div>
                <h1 className="text-5xl font-bold font-kaiseiDecol mb-12">Recorridos Virtuales</h1>
                <div className="mt-10">
                    <Carousel />
                </div>
            </div>
        </div>
    );
}