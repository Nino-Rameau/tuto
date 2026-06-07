
const BlocIconeTexte = ({ titre, texte, icone }) => {
    return (
        <div className="flex flex-col w-full p-4 text-center gap-2 transition-colors duration-200 bg-bleu-fonce2 rounded-xl">
            <div className="flex items-center justify-center mx-auto text-bleu">
                {icone}
            </div>
            <h3 className="text-lg font-bold">{titre}</h3>
            <p className="text-sm text-white/70">{texte}</p>
        </div>
    );
};

export default BlocIconeTexte;