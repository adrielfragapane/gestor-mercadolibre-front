import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const Ordenes = props => {

    const [ordenes, setOrdenes] = useState([]);
    const [producto, setProducto] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(moment().format("YYYY-MM-DD"));
    const [fechaHasta, setFechaHasta] = useState(moment().format("YYYY-MM-DD"));
    const [totales, setTotales] = useState(null);

    useEffect(() => {
        getOrdenes();
    }, []);

    const getOrdenes = async () => {
        console.log(`${process.env.REACT_APP_URL_API}/ordenes`)
        await axios.post(`${process.env.REACT_APP_URL_API}/ordenes`, {
            fechaDesde: fechaDesde != null ? fechaDesde : "2010-01-01",
            fechaHasta: fechaHasta != null ? fechaHasta : "2030-01-01"
        })
            .then(res => {
                setOrdenes(res.data);
                
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        calcularTotales();
    }, [ordenes]);

    const calcularTotales = () => {
        let totalPagado = 0;
        let costoEnvio = 0;
        let totalRecibido = 0;
        let cargoML = 0;
        let fijo = 0;
        let neto = 0;
        ordenes.map(o => {
            totalPagado += o.totalPagado;
            costoEnvio += o.costoEnvio;
            totalRecibido += o.totalRecibido;
            cargoML += o.cargoML;
            fijo += Number(22);
            neto += Number(o.totalRecibido - o.cargoML - 22);
        });
        console.log({
            totalPagado, costoEnvio, totalRecibido, cargoML, fijo, neto
        })
        setTotales({
            totalPagado, costoEnvio, totalRecibido, cargoML, fijo, neto
        });
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
                    {totales && 
                    <tr>
                    <th scope="row">TOTALES</th>
                    <td>*</td>
                    <td style={{ textAlign: 'end' }}>{totales.totalPagado.toFixed(2)}</td>
                    <td style={{ textAlign: 'end' }}>- $ {totales.costoEnvio.toFixed(2)}</td>
                    <td style={{ textAlign: 'end' }}>{totales.totalRecibido.toFixed(2)}</td>
                    <td style={{ textAlign: 'end' }}>- $ {totales.cargoML.toFixed(2)}</td>
                    <td style={{ textAlign: 'end' }}>- $ {totales.fijo.toFixed(2)}</td>
                    <td style={{ textAlign: 'end' }}>{totales.neto.toFixed(2)}</td>

                </tr>}
                    
                    {ordenes.map(orden =>

                        <tr onClick={() => setProducto(orden)} key={orden._id}>
                            <th scope="row">{orden.idProducto}</th>
                            <td>{orden.titulo}</td>
                            <td style={{ textAlign: 'end' }}>{orden.totalPagado.toFixed(2)}</td>
                            <td style={{ textAlign: 'end' }}>- $ {orden.costoEnvio.toFixed(2)}</td>
                            <td style={{ textAlign: 'end' }}>{orden.totalRecibido.toFixed(2)}</td>
                            <td style={{ textAlign: 'end' }}>- $ {orden.cargoML.toFixed(2)}</td>
                            <td style={{ textAlign: 'end' }}>- $ {Number(22).toFixed(2)}</td>
                            <td style={{ textAlign: 'end' }}>{Number(orden.totalRecibido - orden.cargoML - 22).toFixed(2)}</td>

                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Ordenes;