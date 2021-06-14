class Message {
  message: string;
  type: string;
  
  constructor(message: string, type: string) {
    this.message = message;
    this.type = type;
  }

}

export function sendError (message: string = "Algo a salido mal") {
  console.log({message})
  return new Message(message, "Error")
}

export function sendComplete (message: string = "El proceso termino correctamente") {
  return new Message(message, "Completado")
}