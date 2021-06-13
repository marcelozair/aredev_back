interface iConfig {
  URL: string;
  URL_FRONT: string;
  KEY: string;
  PORT: number;
}

export const config: iConfig = {
  URL: "http://localhost:3000",
  URL_FRONT: "http://localhost:4000",
  KEY: "leimotivIsGod",
  PORT: 3000,
}


 /* 
 
 Manejo de errores

 =>  200 => peticion completada
 =>  400 => error en la peticion
 
 */