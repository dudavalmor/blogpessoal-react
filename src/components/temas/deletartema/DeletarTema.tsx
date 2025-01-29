import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Tema from "../../../models/Tema";
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function DeletarTema() {
    const navigate = useNavigate();
    const [tema, setTema] = useState<Tema | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true); // Começa como true

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario?.token || "";

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            console.log(`Buscando tema com ID: ${id}`);
            const response = await buscar(`/temas/${id}`, setTema, {
                headers: {
                    Authorization: token
                }
            });

            console.log("Tema encontrado:", response);
        } catch (error: any) {
            console.error("Erro ao buscar o tema:", error);
            if (error.toString().includes("403")) {
                handleLogout();
            }
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (!token) {
            alert("Você precisa estar logado");
            navigate("/");
        }
    }, [token, navigate]);

    useEffect(() => {
        if (id && token) {
            buscarPorId(id);
        }
    }, [id, token]);

    async function deletarTema() {
        setIsLoading(true);
        try {
            console.log(`Deletando tema com ID: ${id}`);
            await deletar(`/temas/${id}`, {
                headers: {
                    Authorization: token
                }
            });

            alert("Tema apagado com sucesso");
            retornar();
        } catch (error: any) {
            console.error("Erro ao deletar o tema:", error);
            if (error.toString().includes("403")) {
                handleLogout();
            } else {
                alert("Erro ao deletar o tema.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    function retornar() {
        navigate("/temas");
    }

    return (
        <div className="container w-1/3 mx-auto">
            <h1 className="text-4xl text-center my-4">Deletar tema</h1>
            <p className="text-center font-semibold mb-4">
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>
            <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
                <header className="py-2 px-6 bg-rose-300 text-white font-bold text-2xl">
                    Tema
                </header>
                <p className="p-8 text-3xl bg-slate-200 h-full">
                    {isLoading ? "Carregando..." : tema?.descricao || "Erro ao carregar tema"}
                </p>
                <div className="flex">
                    <button
                        className="text-slate-100 bg-red-700 hover:bg-red-600 w-full py-2"
                        onClick={retornar}
                    >
                        Não
                    </button>
                    <button
                        className="w-full text-slate-100 bg-sky-950 hover:bg-sky-900 flex items-center justify-center"
                        onClick={deletarTema}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            />
                        ) : (
                            <span>Sim</span>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarTema;
