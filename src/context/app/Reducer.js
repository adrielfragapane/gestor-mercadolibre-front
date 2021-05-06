import { SELECCIONAR_PRODUCTO, 
    CONFIRMAR_ORDENAR_PLATILLO, 
    MOSTRAR_RESUMEN,
    ELIMINAR_PRODUCTO,
    PEDIDO_ORDENADO, 
    SET_USERDATA,
    SET_COUNTER,
    SET_MY_COUNTERS,
    SET_SUSCRIPTIONS} from "../../types";

export default (state,action) => {
    switch(action.type) {
        case SELECCIONAR_PRODUCTO:
            return {
                ...state,
                platillo: action.payload
            }
        case CONFIRMAR_ORDENAR_PLATILLO:
            return {
                ...state,
                pedido: [...state.pedido, action.payload]
            }
        case MOSTRAR_RESUMEN:
            return {
                ...state,
                total: action.payload
            }
        case ELIMINAR_PRODUCTO:
            return {
                ...state,
                pedido: state.pedido.filter( articulo => articulo.id !== action.payload)
            }
        case PEDIDO_ORDENADO:
            return {
                ...state,
                pedido: [],
                total: 0,
                idpedido: action.payload
            }
        case SET_USERDATA:
            return {
                ...state,
                userData: action.payload
            }
        case SET_COUNTER:
            return {
                ...state,
                counter: action.payload
            }
        case SET_MY_COUNTERS:
            return {
                ...state,
                myCounters: action.payload
            }
        case SET_SUSCRIPTIONS:
            return {
                ...state,
                suscriptions: action.payload
            }
            
        default: 
            return state;
    }
}