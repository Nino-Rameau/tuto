import Btn from "@/components/ui/Btn";

const CarteLivrable = ({ titre, description, icone, lien, externe = false, TexteBtn }) => {
    return (
        <div className="flex flex-col gap-5 p-6 rounded-xl bg-bleu-fonce hover:border-bleu-clair">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-bleu-fonce2">
                {icone}
            </div>
            <div className="flex flex-col gap-2 grow">
                <h2 className="text-lg font-bold text-bleu-clair">{titre}</h2>
                <p className="text-sm text-white">{description}</p>
            </div>
            <Btn lien={lien} target={externe ? "_blank" : undefined} variante="clair">
                {TexteBtn}
            </Btn>
        </div>
    );
};

export default CarteLivrable;