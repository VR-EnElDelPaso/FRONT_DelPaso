import { motion } from 'framer-motion';
import useMuseumStatus from '../../hooks/useMuseumStatus';

function MuseumStatus() {
    const { isOpen, isClosingSoon } = useMuseumStatus();

    const statusText = isOpen ? (isClosingSoon ? 'Cerrando pronto' : 'Abierto ahora') : 'Cerrado';
    const statusColor = isOpen ? (isClosingSoon ? 'yellow' : 'green') : 'red';

    return (
        <div className={`flex items-center text-base font-bold text-${statusColor}-500`}>
            <StatusIndicator color={statusColor} />
            <div>
                {statusText}
            </div>
        </div>
    );
}

const StatusIndicator = ({ color }: { color: string }) => (
    <motion.div
        className={`w-3 h-3 rounded-full mr-2 bg-${color}-500`}
        animate={{ scale: [.5, .8, .5] }}
        transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: 'loop',
        }}
    />
);

export default MuseumStatus;