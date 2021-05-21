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
                console.log(res)
                setOrdenes(res.data);
                
            })
            .catch(err => console.log(err));
    }


    useEffect(() => {
        calcularTotales();
    }, [ordenes]);

    const calcularTotales = () => {
        const tot = {totalTotal : 0 , totalCargoML : 0 , totalImpuestoIB :0 , totalTotalRecibido : 0 , totalDineroFlex : 0 , totalNeto : 0}
        ordenes.map(o => {
            tot.totalTotal += o.total;
            tot.totalCargoML += o.cargoML;
            tot.totalImpuestoIB += o.impuestoIB;
            tot.totalTotalRecibido += o.totalRecibido;
            tot.totalDineroFlex += o.dineroFlex;
            tot.totalNeto += o.neto;
        });
        console.log(tot);
        setTotales(tot);
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
                        <th scope="col" className="text-center">Publicacion</th>
                        <th scope="col" className="text-center">Titulo</th>
                        <th scope="col" className="text-center">Total</th>
                        <th scope="col" className="text-center">Cargo ML</th>
                        <th scope="col" className="text-center">II BB</th>
                        <th scope="col" className="text-center">Recibido</th>
                        <th scope="col" className="text-center">Dinero Flex</th>
                        <th scope="col" className="text-center">Neto</th>
                    </tr>
                </thead>
                <tbody>
                    {totales && 
                    <tr>
                    <th scope="row">TOTALES</th>
                    <td>*</td>
                    <td className="text-center font-weight-bold text-info">$ {totales.totalTotal.toFixed(2)}</td>
                    <td className="text-center font-weight-bold text-danger">- $ {totales.totalCargoML.toFixed(2)}</td>
                    <td className="text-center font-weight-bold text-danger">- $ {totales.totalImpuestoIB.toFixed(2)}</td>
                    <td className="text-center font-weight-bold text-info">$ {totales.totalTotalRecibido.toFixed(2)}</td>
                    <td className="text-center font-weight-bold text-danger">- $ {totales.totalDineroFlex.toFixed(2)}</td>
                    <td className="text-center font-weight-bold text-success">$ {totales.totalNeto.toFixed(2)}</td>
                </tr>}
                    
                    {ordenes.map(orden =>

                        <tr onClick={() => setProducto(orden)} key={orden._id}>
                            <th scope="row">{orden.idProducto}</th>
                            <td>{orden.titulo}</td>
                            <td className="text-right">$ {orden.total.toFixed(2)}</td>
                            <td className="text-right">- $ {orden.cargoML.toFixed(2)}</td>
                            <td className="text-right">- $ {orden.impuestoIB.toFixed(2)}</td>
                            <td className="text-right">$ {orden.totalRecibido.toFixed(2)}</td>
                            <td className="text-right">- $ {orden.dineroFlex.toFixed(2)}</td>
                            <td className="text-right">$ {orden.neto.toFixed(2)}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Ordenes;