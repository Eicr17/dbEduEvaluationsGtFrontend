export interface MdlCuestionarioRespuesta{
    idRespuesta : number,
    idAlumno : string,
    idCuestionario: number,
    idPregunta: number,
    ponderacion: number,
    fechaRegistro : Date,
    estado :number,   
}

export interface MdlCuestionarioRespuestaInsert {
    idRespuesta : number,
    idAlumno : string,
    idCuestionario: number,
    idPregunta: number,
    ponderacion: number,
    fechaRegistro : Date,
    estado :number,
}


export interface MdlCuestionarioRespuestaUpdate {
    idRespuesta : number,
    idAlumno : string,
    idCuestionario: number,
    idPregunta: number,
    ponderacion: number,
    fechaRegistro : Date,
    estado :number,
}