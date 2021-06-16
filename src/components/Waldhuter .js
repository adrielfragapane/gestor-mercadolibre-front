import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Waldhuter = props => {

    const [name, setName] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [dataActualizacion, setDataActualizacion] = useState(null);

    useEffect(() => {
        getDataActualizacion();
    },[])

    const getDataActualizacion = async () => {
        await axios.get(`${process.env.REACT_APP_URL_API}/waldhuter/data`)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    setDataActualizacion(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    const actualizarLibrosExistentes = async () => {
        await axios.post(`${process.env.REACT_APP_URL_API}/waldhuter/actualizarLibrosExistentes`)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    setDataActualizacion(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    const publicarLibrosPendientes = async () => {
        await axios.post(`${process.env.REACT_APP_URL_API}/waldhuter/publicarLibrosPendientes`)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    setDataActualizacion(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    const cargarExcel = async () => {
        let formData = new FormData();

        formData.append("excel", selectedFile);
        await axios.post(`${process.env.REACT_APP_URL_API}/waldhuter/excel`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="mt-5 text-center">
                {/*<input type="text" value={name} onChange={(e) => setName(e.target.value)} />*/}
                <input type="file" name="excel" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <br/>
                <div className="mt-5">
                <button className="btn btn-success" onClick={() => cargarExcel()}>Cargar Excel</button>
                <button className="btn btn-success ml-5" onClick={() => actualizarLibrosExistentes()}>Actualizar Libros Existentes</button>
                <button className="btn btn-success ml-5" onClick={() => publicarLibrosPendientes()}>Publicar Libros Pendientes</button>
                </div>
                <br/>
                <button className="btn btn-primary mt-5" onClick={() => getDataActualizacion()}>Actualizar Resultados</button>
                <br/>
                {dataActualizacion && <>
                    <p>{`Total registros: ${dataActualizacion.total}`}</p>
                    <p>{`Registros pendientes: ${dataActualizacion.pendientes}`}</p>
                    <p>{`Registros pendientes actualización: ${dataActualizacion.pendientesActualizar}`}</p>
                    <p>{`Registros actualizados: ${dataActualizacion.actualizados}`}</p>
                    <p>{`Registros pendientes publicación: ${dataActualizacion.pendientesPublicar}`}</p>
                    <p>{`Registros publicados: ${dataActualizacion.publicados}`}</p>
                </>}

            </div>


        </div>
    )
}

export default Waldhuter;