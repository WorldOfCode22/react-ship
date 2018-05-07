import {Server} from "http";
import socketIo from "socket.io";
import { IEmittedMessage } from "./emitted-message-interface";
import { IEmittedError } from "./errors/emitted-error-interface";
import { CouldNotGetClientsException, CouldNotJoinRoomException, SocketError} from "./errors/socket-error";
import { IOHelper } from "./io-helper";
import SocketManager from "./socket-manager";
/**
 * class that handles the waiting and game rooms of the / namespace logic for socket.io sockets.
 */

export default class GameSocket {
  private io: socketIo.Server;
  private socket: socketIo.Socket;
  constructor(io: socketIo.Server, socket: socketIo.Socket) {
    this.io = io;
    this.socket = socket;
  }

  private socketConfig() {
    this.socket.on("WAITING", () => {
      this.socketWaiting();
    });
  }

  /**
   * Logic that handles socket events and function while socket in in waiting room
   */
  private async socketWaiting() {
    try {
      // join waiting room
      await IOHelper.joinRoom(this.socket, "Waiting");
      const joinMessage: IEmittedMessage = {message: "Waiting for a match"};
      // emit message that user is waiting
      this.socket.emit("Joined Waiting Room", joinMessage);
      const clientList = await IOHelper.getUsersInRoom(this.io, "Waiting");
      // check match
      if (clientList.length > 1) {
        IOHelper.makeMatch(this.io, clientList);
      }
    } catch (e) {
        if (e instanceof CouldNotJoinRoomException) {
          const emittedError: IEmittedError = {
            error: "You could not join room",
            reason: "Internal error",
          };
          this.socket.emit("Error", emittedError);
        } else if (e instanceof CouldNotGetClientsException) {
          const emittedError: IEmittedError = {
            error: "Could not get a list of users waiting for match",
            reason: "Internal Error",
          };
          this.socket.emit("Error", emittedError);
        } else {
          const emittedError: IEmittedError = {
            error: "An unexpected error occurred",
            reason: "Internal error",
          };
          this.socket.emit("Error", emittedError);
        }
    }
  }
}
