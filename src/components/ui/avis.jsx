import { RxAvatar } from "react-icons/rx"; 

const Avis = ({ nom, message }) => {
    return (
        <div className="flex flex-col items-center justify-between gap-2 p-4 border-2 border-bleu-clair md:flex-row rounded-xl">
            <div>
                <RxAvatar className="w-8 h-auto" />
            </div>
            <div className="flex flex-col">
                <h3 className="text-lg font-bold">{nom}</h3>
                <p className="text-sm text-white/70">{message}</p>
            </div>
        </div>
    );
};

export default Avis;