// This file is a collection of errors relating to socket.io functions
// tslint:disable max-classes-per-file
import socketIo from "socket.io";
/**
 * Base error that all socket errors extend
 */
class SocketError extends Error {
  public errGiven: any;
  constructor(message: string, errGiven: any) {
    super(message);
    this.name = "Socket Error";
    this.errGiven = errGiven;
  }
}

/**
 * Error that should occur when a socket is unable to join a room
 */
class CouldNotJoinRoomException extends SocketError {
  public socket: socketIo.Socket;
  public room: string;
  public name = this.constructor.name;
  constructor(socket: socketIo.Socket, room: string, errGiven: any) {
    super("Socket could not join room", errGiven);
    this.socket = socket;
    this.room = room;
  }
}

class CouldNotGetClientsException extends SocketError {
  public name = this.constructor.name;
  constructor(errGiven: any) {
    super("Could not get client list", errGiven);
  }
}

export {SocketError, CouldNotJoinRoomException, CouldNotGetClientsException};
