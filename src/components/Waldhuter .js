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
        await axios.get(`${process.env.REACT_APP_URL_API}/stock/waldhuter/data`)
            .then(res => {
                console.log(res);
                if (res.status == 200) {
                    setDataActualizacion(res.data);
                }
            })
            .catch(err => console.log(err));
    }

    const enviarArchivo = async () => {
        let formData = new FormData();

        formData.append("excel", selectedFile);
        await axios.post(`${process.env.REACT_APP_URL_API}/stock/waldhuter`, formData, {
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
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <input type="file" name="excel" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <br/>
                <button className="btn btn-success mt-5" onClick={() => enviarArchivo()}>Enviar</button>
                <br/>
                <button className="btn btn-primary mt-5" onClick={() => getDataActualizacion()}>Actualizar</button>
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