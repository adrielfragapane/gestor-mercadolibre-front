import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Facturas = props => {

    const [facturas, setFacturas] = useState([]);
    const [producto, setProducto] = useState([]);
    const [fechaDesde, setFechaDesde] = useState(moment().format("YYYY-MM-DD"));
    const [fechaHasta, setFechaHasta] = useState(moment().format("YYYY-MM-DD"));
    const [totales, setTotales] = useState(null);

    useEffect(() => {
        getFacturas();
    }, []);

    const getFacturas = async () => {
        console.log(`${process.env.REACT_APP_URL_API}/ordenes`)
        await axios.post(`${process.env.REACT_APP_URL_API}/ordenes`, {
            fechaDesde: fechaDesde != null ? fechaDesde : "2010-01-01",
            fechaHasta: fechaHasta != null ? fechaHasta : "2030-01-01"
        })
            .then(res => {
                console.log(res)
                setFacturas(res.data);

            })
            .catch(err => console.log(err));
    }

    const facturarOrden = async (id_ml) => {
        await axios.post(`${process.env.REACT_APP_URL_API}/ordenes/${id_ml}/facturar`)
            .then(res => {
                console.log(res)
                if(res.status == 200) {
                    console.log("FACTURACION CORRECTA!!");
                }
                
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        calcularTotales();
    }, [facturas]);

    const calcularTotales = () => {
        const tot = { totalTotal: 0, totalCargoML: 0, totalImpuestoIB: 0, totalTotalRecibido: 0, totalDineroFlex: 0, totalNeto: 0 }
        facturas.map(f => {
            tot.totalTotal += f.total;
            tot.totalCargoML += f.cargoML;
            tot.totalImpuestoIB += f.impuestoIB;
            tot.totalTotalRecibido += f.totalRecibido;
            tot.totalDineroFlex += f.dineroFlex;
            tot.totalNeto += f.neto;
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
                <button type="button" className="btn btn-primary m-3" onClick={() => getFacturas()}>Buscar</button>
                <ReactHTMLTableToExcel
                    id="botonExportarExcel"
                    className="btn btn-success"
                    table="facturas"
                    filename="facturas"
                    sheet="pagina 1"
                    buttonText="Exportar a Excel" />
            </form>


                


            <table className="table table-bordered table-dark" id="facturas">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">Publicacion</th>
                        <th scope="col" className="text-center">Titulo</th>
                        <th scope="col" className="text-center">Fecha</th>
                        <th scope="col" className="text-center">Total</th>
                        <th scope="col" className="text-center">Nombre</th>
                        <th scope="col" className="text-center">Tipo</th>
                        <th scope="col" className="text-center">Numero</th>
                        <th scope="col" className="text-center">Provincia</th>
                        <th scope="col" className="text-center">Facturado</th>
                        <th scope="col" className="text-center">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {facturas.map(factura =>

                        <tr onClick={() => setProducto(factura)} key={factura._id}>
                            <th scope="row">{factura.idProducto}</th>
                            <td>{factura.titulo}</td>
                            <td>{new Date(factura.fechaCierre).toISOString().slice(0, 10)}</td>
                            <td className="text-right">$ {factura.neto.toFixed(2)}</td>
                            <td className="text-left">{(factura.facturacion.nombre + ' ' + factura.facturacion.apellido).toUpperCase()}</td>
                            <td className="text-center">{factura.facturacion.documentoTipo}</td>
                            <td className="text-right">{factura.facturacion.documentoNro}</td>
                            <td className="text-left">{factura.facturacion.provincia}</td>
                            <td className="text-left">{factura.facturada ? 'SI' : 'NO'}</td>
                            <td style={{textAlign: 'center'}}>
                                { factura.facturada ? <button className="btn btn-primary w-100">
                                    VER FACTURA
                                </button> : 
                                <button className="btn btn-success w-100" onClick={() => facturarOrden(factura.id_ml)}>
                                FACTURAR
                            </button>}
                                </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Facturas;