// This file is a collection of errors relating to socket.io functions
// tslint:disable max-classes-per-file
import socketIo from "socket.io";
/**
 * Base error that all socket errors extend
 */
class SocketError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "Socket Error";
  }
}

/**
 * Error that should occur when a socket is unable to join a room
 */
class CouldNotJoinRoom extends SocketError {
  public socket: socketIo.Socket;
  public room: string;
  public errGiven: any;
  constructor(socket: socketIo.Socket, room: string, errGiven: any) {
    super("Socket could not join room");
    this.socket = socket;
    this.room = room;
    this.errGiven = errGiven;
  }
}

export {SocketError, CouldNotJoinRoom};
