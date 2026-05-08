
const Avantage = ({ titre, texte }) => {
    return (
        <div className="flex flex-col gap-2 p-4 text-center transition-colors duration-200 border-2 border-bleu-clair rounded-xl hover:scale-105 hover:border-bleu">
            <h3 className="text-lg font-bold">{titre}</h3>
            <p className="text-sm text-white/70">{texte}</p>
        </div>
    );
};

export default Avantage;