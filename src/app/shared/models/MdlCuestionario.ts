export interface MdlCuestionario{
    idCuestionario : number,
    idMateria : number,
    idGrado: number,
    nombreCuestionario : string,
    descripcion : string,
    fechainicio : Date,
    tiempoLimiteMinutos: number,
}

export interface MdlCuestionarioInsert {
    idCuestionario: number,
    idMateria: number,
    idGrado: number,
    nombreCuestionario: string,
    descripcion : string,
    fechainicio : Date,
    tiempoLimiteMinutos: number,
}

export interface MdlCuestionarioUpdate {
    idCuestionario: number,
    idMateria: number,
    idGrado: number,
    nombreCuestionario: string,
    descripcion : string,
    fechainicio : Date,
    tiempoLimiteMinutos: number,
}