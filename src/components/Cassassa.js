import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap';

const Cassassa = props => {

    const [libros, setLibros] = useState([]);
    const [libro, setLibro] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [precio, setPrecio] = useState(0);
    const [idioma, setIdioma] = useState('');
    const [imagen, setImagen] = useState('');
    const [seleccion, setSeleccion] = useState([]);
    const [selectAll, setSelectAll] = useState(true);
    const [mensaje, setMensaje] = useState('');
    const [showAllert, setShowAllert] = useState(false);


    const change = (_id, checked) => {
        if (checked) {
            setSeleccion([...seleccion, _id]);
        }
        else {
            const seleccion2 = [...seleccion];
            seleccion2.splice(seleccion2.indexOf(_id), 1);
            setSeleccion(seleccion2);
        }
    };

    const changeAll = (add) => {
        setSeleccion(add ? libros.map(l => l._id) : []);
        setSelectAll(add);
    }

    const showNot = (mensaje) => {
        setMensaje(mensaje);
        setShowAllert(true)
    }

    useEffect(() => {
        getLibros();

    }, []);

    useEffect(() => {
        if (libro != null) {
            setTitulo(libro.titulo);
            setAutor(libro.autor);
            setEditorial(libro.editorial);
            setPrecio(libro.precio);
            setIdioma(libro.idioma);
        }
    }, [libro]);

    const getLibros = async () => {
        await axios.get(`${process.env.REACT_APP_URL_API}/cassassa`)
            .then(res => {
                console.log(res)
                setLibros(res.data);
                setSeleccion(res.data.map(l => l._id));
                setSelectAll(true);
            })
            .catch(err => console.log(err));
    }

    const descartarLibro = async (_id) => {
        await axios.post(`${process.env.REACT_APP_URL_API}/cassassa/descartarLibro/${_id}`)
            .then(res => {
                console.log(res);
                getLibros();
            })
            .catch(err => console.log(err));
    }

    const publicarLibros = async () => {
        await axios.post(`${process.env.REACT_APP_URL_API}/cassassa/publicarLibros`, { libros: seleccion })
            .then(res => {
                console.log(res);
                showNot(`Se han actualizado ${res.data.publicados} libros...`)
                getLibros();
            })
            .catch(err => console.log(err));
    }


    const update = async () => {
        let _id = libro._id
        let _titulo = selectValue(titulo, libro.titulo);
        let _autor = selectValue(autor, libro.autor);
        let _editorial = selectValue(editorial, libro.editorial);
        let _precio = selectValue(precio, libro.precio);
        let _idioma = selectValue(idioma, libro.idioma);

        await axios.post(`${process.env.REACT_APP_URL_API}/cassassa/updateDatos`,
            {
                libros: [{ _id, titulo: _titulo, autor: _autor, editorial: _editorial, precio: _precio, idioma: _idioma }]
            })
            .then(res => {
                getLibros();
                setLibro(null);
            })
            .catch(err => console.log(err));
    }

    const selectValue = (val1, val2) => {
        return val1 != null ? val1 : (val2 != null ? val2 : undefined);
    }

    return (
        <div>

            { showAllert && <div className="alert alert-warning alert-dismissible fade show" role="alert" 
            style={{position:'fixed', top: '0px', right: '0px'}}>
                {mensaje}
                    <button type="button" className="close" data-dismiss="alert" aria-label="Close"
                    onClick={() => setShowAllert(false)}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}

            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col" style={{ textAlign: 'center' }}>ISBN</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Titulo</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Autor</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Editorial</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Precio</th>
                        <th scope="col" style={{ textAlign: 'center' }}>Idioma</th>
                        <th scope="col" style={{ textAlign: 'center' }}><div>
                            <input className="m-2" type="checkbox" checked={selectAll} onChange={e => changeAll(e.target.checked)} />
                        </div>

                        </th>
                        <th scope="col" style={{ textAlign: 'center' }}>
                            <button className="btn btn-primary"
                                onClick={() => publicarLibros()}>Publicar</button>
                        </th>
                        <th scope="col" style={{ textAlign: 'center' }}>Imagen</th>
                    </tr>
                </thead>
                <tbody>
                    {libros && libros.map(l =>

                        <tr key={l._id}>
                            <th scope="row" style={{ textAlign: 'center' }}>{l.isbn}</th>

                            <td>
                                {
                                    libro != null && libro._id == l._id ? <input type="text" id="titulo" className="form-control" style={{ margin: '0 auto' }}
                                        value={titulo} onChange={e => setTitulo(e.target.value)} /> : l.titulo
                                }
                            </td>
                            <td style={{ textAlign: 'center' }}>{l.autor}</td>
                            <td style={{ textAlign: 'center' }}>{l.editorial}</td>
                            <td style={{ textAlign: 'end' }}>$ {l.precio.toFixed(2)}</td>

                            <td style={{ textAlign: 'center' }}>
                                {
                                    libro != null && libro._id == l._id ? <select className="form-select"
                                        value={idioma} onChange={e => setIdioma(e.target.value)}>
                                        <option value="">Seleccionar</option>
                                        <option value="Español">Español</option>
                                        <option value="Inglés">Inglés</option>
                                        <option value="Portugues">Portugues</option>
                                    </select> : l.idioma
                                }
                            </td>

                            <td style={{ textAlign: 'center' }}>
                                <input type="checkbox" checked={seleccion.includes(l._id)} onChange={e => change(l._id, e.target.checked)} />
                            </td>

                            <td style={{ textAlign: 'center' }}>
                                {libro != null && libro._id == l._id ? <button className="btn btn-success w-100"
                                    onClick={() => update()}>Actualizar</button> :
                                    <button className="btn btn-success w-100"
                                        onClick={() => setLibro(l)}>Editar</button>}
                                <button className="btn btn-danger w-100 mt-3"
                                    onClick={() => descartarLibro(l._id)}>Descartar</button>
                            </td>
                            <td style={{ textAlign: 'center' }}><img src={l.linkImagen}
                                style={{ height: '100px', width: '60px', borderRadius: '10px', cursor: 'zoom-in' }}
                                onClick={() => setImagen(l.linkImagen)} data-toggle="modal" data-target="#myModal" /></td>
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
                            {imagen && <>
                                <img src={imagen} />
                            </>}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Cassassa;