export interface MdlCatedratico {
    idCatedratico:number,
    idGrado: number,
    nombreCatedratico: string
    correo: string,
    telefono: number,
}

export interface MdlCatedraticoInsert{
    idCatedratico:number,
    idGrado: number,
    nombreCatedratico: string
    correo: string,
    telefono: number,
}

export interface MdlCatedraticoUpdate {
    idCatedratico:number,
    idGrado: number
    nombreCatedratico: string,
    correo: string,
    telefono: number,
}

