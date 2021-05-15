import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as moment from 'moment';

const Cassassa = props => {

    const [libros, setLibros] = useState([]);
    const [libro, setLibro] = useState(null);
    const [titulo, setTitulo] = useState('');
    const [autor, setAutor] = useState('');
    const [editorial, setEditorial] = useState('');
    const [precio, setPrecio] = useState(0);
    const [idioma, setIdioma] = useState('');
    const [imagen, setImagen] = useState('');

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
            })
            .catch(err => console.log(err));
    }

    const publicarLibro = async (_id) => {
        await axios.post(`${process.env.REACT_APP_URL_API}/cassassa/publicarLibro/${_id}`)
            .then(res => {
                console.log(res);
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
            <table className="table table-bordered table-dark">
                <thead>
                    <tr>
                        <th scope="col">ISBN</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Autor</th>
                        <th scope="col">Editorial</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Idioma</th>
                        <th scope="col">Acciones</th>
                        <th scope="col">Imagen</th>
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
                                {libro != null && libro._id == l._id ? <button className="btn btn-success"
                                    onClick={() => update()}>Actualizar</button> :
                                    <button className="btn btn-success"
                                        onClick={() => setLibro(l)}>Editar</button>}
                                <button className="btn btn-primary"
                                    onClick={() => publicarLibro(l._id)}>Publicar</button>
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