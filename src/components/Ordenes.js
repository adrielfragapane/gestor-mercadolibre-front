import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const Ordenes = props => {

    const [Ordenes, setOrdenes] = useState([]);
    const [producto, setProducto] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(moment().format("YYYY-MM-DD"));
    const [fechaHasta, setFechaHasta] = useState(moment().format("YYYY-MM-DD"));

    useEffect(() => {
        getOrdenes();
    }, []);

    const getOrdenes = async () => {
        await axios.post('http://127.0.0.1:3000/ordenes', {
            fechaDesde: fechaDesde != null ? fechaDesde : "2010-01-01",
            fechaHasta: fechaHasta != null ? fechaHasta : "2030-01-01"
        })
            .then(res => {
                setOrdenes(res.data);
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <form className="bg-dark">
                <div className="form-group">
                    <label htmlFor="fechaDesde">Desde</label>
                    <input type="date" className="form-control" id="fechaDesde" value={fechaDesde} onChange={e => setFechaDesde(moment(e.target.value).format("YYYY-MM-DD"))} />
                </div>
                <div className="form-group">
                    <label htmlFor="fechaHasta">Hasta</label>
                    <input type="date" className="form-control" id="fechaHasta" value={fechaHasta} onChange={e => setFechaHasta(moment(e.target.value).format("YYYY-MM-DD"))} />
                </div>
                <button type="button" className="btn btn-primary m-3" onClick={() => getOrdenes()}>Buscar</button>
            </form>

            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col">Publicacion</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Total</th>
                        <th scope="col">Costo Envío</th>
                        <th scope="col">Recibido</th>
                        <th scope="col">Cargo ML</th>
                        <th scope="col"> - $ 22.00</th>
                        <th scope="col">Neto</th>
                    </tr>
                </thead>
                <tbody>
                    {Ordenes.map(producto =>
                        /*<div onClick={() => setProducto(producto)} className="card col-12 col-sm-6 col-md-3 m-3 p-0 text-center" key={producto._id}>*/

                        <tr onClick={() => setProducto(producto)} key={producto._id}>
                            <th scope="row">{producto.idProducto}</th>
                            <td>{producto.titulo}</td>
                            <td style={{textAlign: 'end'}}>{producto.totalPagado.toFixed(2)}</td>
                            <td style={{textAlign: 'end'}}>- $ {producto.costoEnvio.toFixed(2)}</td>
                            <td style={{textAlign: 'end'}}>{producto.totalRecibido.toFixed(2)}</td>
                            <td style={{textAlign: 'end'}}>- $ {producto.cargoML.toFixed(2)}</td>
                            <td style={{textAlign: 'end'}}>- $ {Number(22).toFixed(2)}</td>
                            <td style={{textAlign: 'end'}}>{Number(producto.totalRecibido - producto.cargoML - 22).toFixed(2)}</td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Ordenes;