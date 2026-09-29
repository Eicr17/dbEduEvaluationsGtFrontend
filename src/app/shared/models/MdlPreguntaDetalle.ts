export interface MdlPreguntaDetalle {
    idPreguntaDetalle: number,
    idPregunta: number,
    descripcion: string,
    ponderacion : number
}

export interface MdlPreguntaDetalleInsert{
    idPreguntaDetalle: number,
    idPregunta: number,
    descripcion: string,
    ponderacion : number

}

export interface MdlPreguntaDetalleUpdate{
    idPreguntaDetalle: number,
    idPregunta: number,
    descripcion: string,
    ponderacion : number
}