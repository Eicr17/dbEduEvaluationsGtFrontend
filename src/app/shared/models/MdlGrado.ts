export interface MdlGrado {
    idGrado: number,
    nombreGrado : string,
    seccion : string,
    anioLectivo : number,
    idCatedratico : number,
}


export interface MdlGradoInsert {
    idGrado: number,
    nombreGrado : string,
    seccion : string,
    anioLectivo : number,
    idCatedratico : number,
}


export interface MdlGradoUpdate {
     idGrado: number,
    nombreGrado : string,
    seccion : string,
    anioLectivo : number,
    idCatedratico : number,
}