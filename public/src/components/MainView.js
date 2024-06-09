import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./HomePage.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import "../../utils/custom-toast.css";
//import config from "../../config/config.js";
//import Loader from "../Loader/loader.js"; // Asegúrate de tener este componente

function HomePage() {
    const navigate = useNavigate();
    const [pasteles, setPasteles] = useState([]);
    const [pagina, setPagina] = useState(1);
    const [totalPasteles, setTotalPasteles] = useState(0);
   // const [isLoading, setIsLoading] = useState(false); // Estado para controlar el loader
    const [modalVisible, setModalVisible] = useState(false);
    const [pastelSeleccionado, setPastelSeleccionado] = useState(null);
    const [fotoPrincipal, setFotoPrincipal] = useState("");

    useEffect(() => {
        const cargarPasteles = async () => {
            //setIsLoading(true); // Activar el loader
            try {
                const url = `https://proyectofinal-qayw.onrender.com/pasteles?page=${pagina}&limit=8`;
                const respuesta = await axios.get(url);
                if (respuesta.data && Array.isArray(respuesta.data.data)) {
                    setPasteles(respuesta.data.data);
                    setTotalPasteles(respuesta.data.total);
                } else {
                    console.error(
                        "La respuesta no contiene un arreglo de pasteles:",
                        respuesta.data
                    );
                    setPasteles([]);
                }
            } catch (error) {
                console.error("Error al cargar los pasteles:", error);
                setPasteles([]);
            } finally {
               // setIsLoading(false); // Desactivar el loader
            }
        };

        cargarPasteles();
    }, [pagina]);

    const siguientePagina = () => {
        // Calcula el número total de páginas
        const totalPaginas = Math.ceil(totalPasteles / 8);
        if (pagina < totalPaginas) {
            setPagina((paginaPrev) => paginaPrev + 1);
        }
    };

    const anteriorPagina = () => {
        if (pagina > 1) {
            setPagina((paginaPrev) => paginaPrev - 1);
        }
    };

    const abrirModal = (pastel) => {
        setPastelSeleccionado(pastel);
        setFotoPrincipal(`/images/${pastel.foto}`);
        setModalVisible(true);
    };

    const cerrarModal = () => {
        setModalVisible(false);
        setPastelSeleccionado(null);
    };

    const cambiarFotoPrincipal = (foto) => {
        setFotoPrincipal(`/images/${foto}`);
    };

 /*    if (isLoading) {
        return <Loader />;
    } */

    // Función para añadir al carrito
    const añadirAlCarrito = async (pastelId, cantidad = 1) => {
        const token = localStorage.getItem("token");
        if (!token) {
            // Si no hay token, redirigir a la ruta de formulario
            navigate("/formulario");
            return;
        }

        const pastel = pasteles.find((pastel) => pastel._id === pastelId);
        if (pastel && pastel.stock < cantidad) {
            toast.error(
                `${("error.hoodie")} ${pastel.nombre} ${("error.notStock")}`
            );
            return;
        }

        try {
            const url = `https://proyectofinal-qayw.onrender.com/carrito/addItem`;
            const respuesta = await axios.post(
                url,
                { pastelId, cantidad },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (respuesta.status === 200) {
                toast.success(("error.itemSuccess"));
                cerrarModal(); // Opcionalmente puedes cerrar el modal después de añadir al carrito
            } else {
                toast.error(("error.itemFail"));
            }
        } catch (error) {
            console.error("Error al añadir ítem al carrito:", error);
            toast.error(("error.cartProblems"));
        }
    };

    return (
        <div className={styles.Pagina}>
            <h1 className={styles.texto}>{("homePage.homeText")}</h1>
            <div className={styles.productosContainer}>
                {pasteles.map((pastel) => (
                    <div key={pastel.nombre} className={styles.producto}>
                        <img
                            src={`/images/${pastel.foto}`}
                            alt={pastel.nombre}
                            className={styles.productoImagen}
                        />
                        <h3>{pastel.nombre}</h3>
                        <p>{pastel.precio}€</p>
                        <button
                            onClick={() => abrirModal(pastel)}
                            className={styles.botonsito}
                        >
                            {("Ver mas")}
                        </button>
                    </div>
                ))}
            </div>
            <div className={styles.botonesNav}>
                <button
                    onClick={anteriorPagina}
                    disabled={pagina <= 1} // Deshabilita el botón si estamos en la página 1
                >
                    {("Anterior")}
                </button>
                {pasteles.length > 0 ? (
                    <button
                        onClick={siguientePagina}
                        disabled={pagina >= Math.ceil(totalPasteles / 8)} // Deshabilita el botón si estamos en la última página
                    >
                        {("Siguiente")}
                    </button>
                ) : (
                    <p>{("FINISH/no vamos a comer ma/ fin de pasteles")}</p>
                )}
            </div>
            {modalVisible && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalBody}>
                            <div className={styles.modalImageContainer}>
                                <div className={styles.modalImage}>
                                    <img
                                        src={fotoPrincipal}
                                        alt="Imagen Principal"
                                    />
                                </div>
                                <div className={styles.modalSecondaryImages}>
                                    {pastelSeleccionado.fotosSecundarias?.map(
                                        (foto, index) => (
                                            <img
                                                key={index}
                                                src={`/images/${foto}`}
                                                alt={`Secundaria ${index + 1}`}
                                                onClick={() =>
                                                    cambiarFotoPrincipal(foto)
                                                }
                                                className={
                                                    styles.imagenSecundaria
                                                }
                                            />
                                        )
                                    )}
                                </div>
                            </div>
                            <div className={styles.modalInfo}>
                                <h2>{pastelSeleccionado.nombre}</h2>
                                <div className={styles.pastelInfo}>
                                    <p>
                                        {("precio")}{" "}
                                        {pastelSeleccionado.precio}€
                                    </p>
                                    <p>
                                        {("alergenos")}{" "}
                                        {pastelSeleccionado.alergenos.join(", ")}
                                    </p>
                                </div>
                                <div className={styles.descripcionPastel}>
                                    <p>
                                        {("descripcion")}{" "}
                                        {pastelSeleccionado.descripcion}
                                    </p>
                                </div>
                                <button
                                    className={styles.botonsito}
                                    onClick={() =>
                                        añadirAlCarrito(
                                            pastelSeleccionado._id
                                        )
                                    }
                                >
                                    {("añadir al carrito")}
                                </button>
                            </div>
                            <button
                                className={styles.closeButton}
                                onClick={cerrarModal}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HomePage;
