import React, { useReducer } from 'react';

import Reducer from './Reducer';
import Context from './Context';

import {    SELECCIONAR_PRODUCTO, 
            CONFIRMAR_ORDENAR_PLATILLO,
            MOSTRAR_RESUMEN,
            ELIMINAR_PRODUCTO,
            PEDIDO_ORDENADO, 
            SET_USERDATA,
            SET_COUNTER,
            SET_MY_COUNTERS,
            SET_SUSCRIPTIONS} from '../../types';

const State = props => {

    // Crear state inicial
    const initialState = {
        pedido: [],
        platillo: null,
        total: 0,
        idpedido: '',
        userData: null,
        counter: null,
        myCounters: [],
        suscriptions: []
    }

    // useReducer con dispatch para ejecutar las funciones
    const [ state, dispatch ] = useReducer(Reducer,initialState);

    // seta las suscripciones del usuario
    const setSuscriptions = suscriptions => {
        dispatch({
            type: SET_SUSCRIPTIONS,
            payload: suscriptions
        })
    }

    // seta los contadores del usuario
    const setMyCounters = myCounters => {
        dispatch({
            type: SET_MY_COUNTERS,
            payload: myCounters
        })
    }
    

    // seta los datos del usuario al iniciar sesión
    const setCounter = counter => {
        dispatch({
            type: SET_COUNTER,
            payload: counter
        })
    }

    // seta los datos del usuario al iniciar sesión
    const setUserData = userData => {
        dispatch({
            type: SET_USERDATA,
            payload: userData
        })
    }

    // seleccione el producto que el usuario desea ordenar
    const seleccionarPlatillo = platillo => {
        dispatch({
            type: SELECCIONAR_PRODUCTO,
            payload: platillo
        })
    }
    
    // cuando el usuario confirma un platillo
    const guardarPedido = pedido => {
        dispatch({
            type: CONFIRMAR_ORDENAR_PLATILLO,
            payload: pedido
        })
    }
    
    // muestra el total a pagar en el resumen
    const mostrarResumen = total => {
        dispatch({
            type: MOSTRAR_RESUMEN,
            payload: total
        })
    }

    const eliminarProducto = id => {
        dispatch({
            type: ELIMINAR_PRODUCTO,
            payload: id
        })
    }

    const pedidoRealizado = id => {
        dispatch({
            type: PEDIDO_ORDENADO,
            payload: id
        })
    }
    return (
        <Context.Provider
            value={{
                pedido: state.pedido,
                platillo: state.platillo,
                total: state.total,
                idpedido: state.idpedido,
                userData: state.userData,
                counter: state.counter,
                myCounters: state.myCounters,
                suscriptions: state.suscriptions,
                seleccionarPlatillo,
                guardarPedido,
                mostrarResumen,
                eliminarProducto,
                pedidoRealizado,
                setUserData,
                setCounter,
                setMyCounters,
                setSuscriptions
            }}>
            {props.children}
        </Context.Provider>
    )

}

export default State;