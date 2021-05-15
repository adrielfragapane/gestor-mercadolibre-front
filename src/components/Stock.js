import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const Stock = props => {

    const [libros, setLibros] = useState([]);
    const [libro, setLibro] = useState(null);
    const [estante, setEstante] = useState('');
    const [posicion, setPosicion] = useState('');
    const [propietario, setPropietario] = useState('');

    useEffect(() => {
        getlibros();
    }, []);

    useEffect(() => {
        if (libro != null) {
            setEstante(libro.estante);
            setPosicion(libro.posicion);
            setPropietario(libro.propietario);
        }
    }, [libro]);

    const getlibros = async () => {
        await axios.get(`${process.env.REACT_APP_URL_API}/stock`)
            .then(res => {
                setLibros(res.data);
            })
            .catch(err => console.log(err));
    }

    const update = async () => {
        let id_ml = libro.id_ml
        let _estante = selectValue(estante, libro.estante);
        let _posicion = selectValue(posicion, libro.posicion);
        let _propietario = selectValue(propietario, libro.propietario);
        await axios.post(`${process.env.REACT_APP_URL_API}/stock/actualizarDatos`,
            {
                books: [{ id_ml, estante: _estante, posicion: _posicion, propietario: _propietario }]
            })
            .then(res => {
                getlibros();
                setLibro(null);
            })
            .catch(err => console.log(err));
    }

    const selectValue = (val1, val2) => {
        return val1 != null ? val1 : (val2 != null ? val2 : undefined);
    }

    return (
        <div>
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign: 'center' }}>Publicacion</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Titulo</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Precio</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Estado</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Estante</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Posicion</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Propietario</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Acciones</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {libros && libros.map(l =>

                        <tr key={l._id}>
                            <th scope="row" style={{ textAlign: 'center' }}>{l.id_ml}</th>
                            <td>{l.publicacion}</td>
                            <td style={{ textAlign: 'end' }}>$ {l.precio.toFixed(2)}</td>
                            <td style={{ textAlign: 'center' }}>{l.estado}</td>
                            <td style={{ textAlign: 'center' }}>
                                {
                                    libro != null && libro._id == l._id ? <input type="text" id="estante" className="form-control" style={{ width: '50px', margin: '0 auto', textAlign: 'center' }}
                                        value={estante} onChange={e => setEstante(e.target.value)} /> : l.estante
                                }

                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {
                                    libro != null && libro._id == l._id ? <input type="text" id="posicion" className="form-control" style={{ width: '50px', margin: '0 auto', textAlign: 'center' }}
                                        value={posicion} onChange={e => setPosicion(e.target.value)} /> : l.posicion
                                }

                            </td>
                            <td style={{ textAlign: 'center' }}>

                                {
                                    libro != null && libro._id == l._id ? <select className="form-select"
                                        value={propietario} onChange={e => setPropietario(e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        <option value="Ignacio">Ignacio</option>
                                        <option value="Laura">Laura</option>
                                    </select> : l.propietario
                                }



                            </td>
                            <td style={{ textAlign: 'center' }}>
                                {libro != null && libro._id == l._id ? <button className="btn btn-success"
                                    onClick={() => update()}>Actualizar</button> :
                                    <button className="btn btn-success"
                                        onClick={() => setLibro(l)}>Editar</button>}

                            </td>

                            <td style={{ textAlign: 'center' }}><img src={l.pictures[0]}
                                style={{ height: '100px', width: '60px', borderRadius: '10px', cursor: 'zoom-in' }}
                                onClick={() => setLibro(l)} data-toggle="modal" data-target="#myModal" /></td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog">

                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>
                        <div className="modal-body d-flex justify-content-center">
                            {libro && <>
                                <img src={libro.pictures[0]} />
                            </>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Stock;