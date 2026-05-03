export const metadata = {
    title: "Profil | tuto",
    description: "",
};

const profil = async () => {
    const categories = await prisma.categorie.findMany();

    return (
        <div className="p-5">
            <h1 className="">Support de communication</h1>
        
        </div>
    );
}

export default profil;