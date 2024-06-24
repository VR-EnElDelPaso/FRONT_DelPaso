import { useEffect, useState } from 'react';

interface MuseumStatus {
    isOpen: boolean;
    isClosingSoon: boolean;
}

const useMuseumStatus = (): MuseumStatus => {
    const [museumStatus, setMuseumStatus] = useState<MuseumStatus>({
        isOpen: false,
        isClosingSoon: false,
    });

    useEffect(() => {
        const checkMuseumStatus = () => {
            const simulatedDate = new Date();
            const day = simulatedDate.getDay();
            const hour = simulatedDate.getHours();
            const minute = simulatedDate.getMinutes();

            const isOpen = (startHour: number, endHour: number) => {
                return hour >= startHour && (hour < endHour || (hour === endHour && minute === 0));
            };

            const isClosingSoon = (endHour: number) => {
                const closeThresholdHour = endHour - 1;
                return hour === closeThresholdHour || (hour === endHour && minute < 60);
            };

            let isOpenNow = false;
            let isClosingSoonNow = false;

            if (day === 0) { // Domingo
                isOpenNow = isOpen(10, 13);
                isClosingSoonNow = isOpenNow && isClosingSoon(13);
            } else if (day === 1) { // Lunes
                isOpenNow = false;
                isClosingSoonNow = false;
            } else if (day >= 2 && day <= 6) { // Martes a Sábado
                const morningOpen = isOpen(10, 14);
                const eveningOpen = isOpen(17, 20);

                isOpenNow = morningOpen || eveningOpen;
                isClosingSoonNow = (morningOpen && isClosingSoon(14)) || (eveningOpen && isClosingSoon(20));
            }

            setMuseumStatus({
                isOpen: isOpenNow,
                isClosingSoon: isClosingSoonNow,
            });
        };

        // Verificar el estado del museo cada minuto
        const interval = setInterval(checkMuseumStatus, 60000);
        checkMuseumStatus();

        return () => clearInterval(interval);
    }, []);

    return museumStatus;
};

export default useMuseumStatus;