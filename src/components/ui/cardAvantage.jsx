
const Avantage = ({ titre, texte, icone }) => {
    return (
        <div className="flex flex-col gap-2 p-4 text-center transition-colors duration-200 w-3xl bg-bleu-fonce2 rounded-xl hover:scale-110">
            <div className="flex items-center justify-center mx-auto text-bleu">
                {icone}
            </div>
            <h3 className="text-lg font-bold">{titre}</h3>
            <p className="text-sm text-white/70">{texte}</p>
        </div>
    );
};

export default Avantage;