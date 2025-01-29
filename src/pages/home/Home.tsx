import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens"
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem"

function Home() {
    return (
        <>
            <div className="bg-gray-100 flex justify-center">
                <div className='container grid grid-cols-2 text-black'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Seja bem vindo!
                        </h2>
                        <p className='text-xl'>
                            Sinta-se livre para se expressar
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                    <img src="/fotohome.png" alt="Imagem Página Home" className="w-2/3" />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    )
}

export default Home