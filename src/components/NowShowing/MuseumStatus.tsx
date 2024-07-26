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
        <motion.div 
            className={`flex items-center justify-end space-x-2 text-base font-bold ${text} p-2 rounded-full bg-gray-50 shadow-md`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <StatusIndicator color={bg} />
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
            >
                {label}
            </motion.div>
        </motion.div>
    );
}

type StatusIndicatorProps = {
    color: string;
};

const StatusIndicator = ({ color }: StatusIndicatorProps) => (
    <motion.div
        className={`w-4 h-4 rounded-full ${color}`}
        animate={{ 
            scale: [0.5, 1.1, 0.5],
            boxShadow: [
                '0 0 0 0 rgba(0, 0, 0, 0.3)',
                '0 0 0 10px rgba(0, 0, 0, 0)',
                '0 0 0 0 rgba(0, 0, 0, 0.3)'
            ]
        }}
        transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: 'reverse',
            ease: "easeInOut"
        }}
    />
);

export default MuseumStatus;