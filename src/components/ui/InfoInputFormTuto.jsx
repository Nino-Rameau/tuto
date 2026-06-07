import { AiOutlineInfoCircle } from "react-icons/ai"; 

const InfoInputFormTuto = ({ texte }) => {
    return (
        <span className="relative group">
            <AiOutlineInfoCircle />
            <span className="absolute z-10 hidden px-2 py-1 mb-1 text-xs text-white border border-white rounded left-1/2 -translate-x-1/2 bottom-full group-hover:block w-60 bg-bleu-fonce2">
                {texte}
            </span>
        </span>
    );
};

export default InfoInputFormTuto;