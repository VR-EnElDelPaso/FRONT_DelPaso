import { FaBars, FaTimes } from 'react-icons/fa';

interface MenuButtonProps {
    isOpen: boolean;
    onClick: () => void;
}

const MenuButton = ({ isOpen, onClick }: MenuButtonProps) => (
    <button onClick={onClick} aria-label="Toggle menu">
        {isOpen ? <FaTimes className="text-3xl" /> : <FaBars className="text-3xl" />}
    </button>
);

export default MenuButton;