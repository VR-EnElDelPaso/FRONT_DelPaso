import { motion } from 'framer-motion';
import useMuseumStatus from '../../hooks/useMuseumStatus';

const statusConfig = {
    closed: { text: 'text-red-500', bg: 'bg-red-500', label: 'Cerrado' },
    closingSoon: { text: 'text-yellow-500', bg: 'bg-yellow-500', label: 'Cerrando pronto' },
    open: { text: 'text-green-500', bg: 'bg-green-500', label: 'Abierto ahora' }
};

function getStatus(isOpen: boolean, isClosingSoon: boolean) {
    if (!isOpen) return statusConfig.closed;
    if (isClosingSoon) return statusConfig.closingSoon;
    return statusConfig.open;
}

function MuseumStatus() {
    const { isOpen, isClosingSoon } = useMuseumStatus();
    const { text, bg, label } = getStatus(isOpen, isClosingSoon);

    return (
        <div className={`flex items-center text-base font-bold ${text}`}>
            <StatusIndicator color={bg} />
            <div>
                {label}
            </div>
        </div>
    );
}

type StatusIndicatorProps = {
    color: string;
};

const StatusIndicator = ({ color }: StatusIndicatorProps) => (
    <motion.div
        className={`w-3 h-3 rounded-full mr-2 ${color}`}
        animate={{ scale: [0.5, 0.8, 0.5] }}
        transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: 'loop',
        }}
    />
);

export default MuseumStatus;
