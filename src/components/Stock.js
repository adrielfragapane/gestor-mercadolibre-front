import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const Ordenes = props => {

    const [publicaciones, setPublicaciones] = useState([]);
    const [publicacion, setPublicacion] = useState(null);
    const [publicacionesFiltradas, setPublicacionesFiltradas] = useState([]);

    useEffect(() => {
        getPublicaciones();
    }, []);

    const getPublicaciones = async () => {
        await axios.get('http://127.0.0.1:3000/stock')
            .then(res => {
                setPublicaciones(res.data);
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
                        <th scope="col">Precio</th>
                        <th scope="col">Estado</th>
                        <th scope="col">Estante</th>
                        <th scope="col">Posicion</th>
                        <th scope="col">Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {publicaciones.map(p =>

                        <tr key={p._id}>
                            <th scope="row" style={{textAlign: 'center'}}>{p.id_ml}</th>
                            <td>{p.producto}</td>
                            <td style={{textAlign: 'end'}}>$ {p.precio.toFixed(2)}</td>
                            <td style={{textAlign: 'center'}}>{p.estado}</td>
                            <td style={{textAlign: 'center'}}>{p.estante}</td>
                            <td style={{textAlign: 'center'}}>{p.posicion}</td>
                            <td style={{textAlign: 'center'}}><img src={p.picture} 
                            style={{height: '100px', width: '60px', borderRadius: '10px', cursor:'zoom-in'}} 
                            onClick={() => setPublicacion(p)} data-toggle="modal" data-target="#myModal"/></td>
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
                            {publicacion && <>
                            <img src={publicacion.picture} />
                            </>}                            
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Ordenes;