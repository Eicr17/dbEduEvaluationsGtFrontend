export interface MdlEvaluacionRespuesta{
    idRespuesta : number,
    idCuestionario: number,
    idPregunta: number,
    ponderacion: number,
    fechaRegistro : Date,
}

export interface MdlEvaluacionRespuestaInsert {
    idRespuesta : number,
    idAlumno : string,
    idCuestionario: number,
    idPregunta: number,
    ponderacion: number,
    fechaRegistro : Date,
}


export interface MdlEvaluacionRespuestaUpdate {
    idRespuesta : number,
    idAlumno : string,
    idCuestionario: number,
    idPregunta: number,
    ponderacion: number,
    fechaRegistro : Date,
}