import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const Preguntas = props => {

    const [preguntas, setPreguntas] = useState([]);
    const [pregunta, setPregunta] = useState(null);
    const [respuesta, setRespuesta] = useState('');
    const [tipo, setTipo] = useState(null);

    useEffect(() => {
        getPreguntas();
    }, []);

    const getPreguntas = async () => {
        await axios.get(`${process.env.REACT_APP_URL_API}/notificaciones/preguntas`)
            .then(res => {
                setPreguntas(res.data);
            })
            .catch(err => console.log(err));
    }

    const reponderPregunta = async (id_ml,type,texto) => {
        await axios.post(`${process.env.REACT_APP_URL_API}/notificaciones/preguntas/responder`, 
        {
            id_ml: id_ml,
            type: 'AUTOMATIC',
        })
            .then(res => {
                setPreguntas(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col">Publicacion</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Pregunta</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {preguntas.map(p =>

                        <tr key={p._id}>
                            <th scope="row" style={{textAlign: 'center'}}>{p.idPublicacion}</th>
                            <td>{p.tituloPublicacion}</td>
                            <td style={{textAlign: 'end'}}>{p.texto}</td>
                            <td style={{textAlign: 'center'}}>{p.fecha}</td>
                            <td style={{textAlign: 'center'}}>{p.estado}</td>
                            <td style={{textAlign: 'center'}}>
                                <button className="btn btn-success" onClick={() => reponderPregunta()}>
                                    RESPUESTA AUTOMATICA
                                </button>
                                <button className="btn btn-info">
                                    ESCRIBIR RESPUESTA
                                </button>
                                </td>
                        </tr>
                    )}
                </tbody>
            </table>
        
        </div>
    )
}

export default Preguntas;