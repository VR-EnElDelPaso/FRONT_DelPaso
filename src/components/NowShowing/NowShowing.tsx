import MuseumStatus from "./MuseumStatus";

export default function NowShowing() {
    return (
        <div className="relative flex flex-col">
            <div className="absolute top-3 right-3">
                <MuseumStatus />
            </div>
        </div>
    );
}
