'use client';

interface FoItemProps{
    onClick: () => void;
    label: string;

}
const FoItem: React.FC<FoItemProps> = ({
    onClick,
    label
}) => {
    
    return(
        <div 
        onClick={onClick}
        className="
        px-4
        py-3
        transition
        ">
        {label}
        </div>
    );
}

export default FoItem;