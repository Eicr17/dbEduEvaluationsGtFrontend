export interface MdlPregunta {
    idPregunta : number,
    idTipoPregunta: number,
    idCuestionario:number,
    descripcion : string,
    ponderacion: number
}

export interface MdlPreguntaInsert {
       idPregunta : number,
    idTipoPregunta: number,
    idCuestionario:number,
    descripcion : string,
    ponderacion: number
}

export interface MdlPreguntaUpdate {
       idPregunta : number,
    idTipoPregunta: number,
    idCuestionario:number,
    descripcion : string,
    ponderacion: number
}
