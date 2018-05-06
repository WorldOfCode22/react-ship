import {Server} from "http";
import socketIo from "socket.io";
import { IEmittedMessage } from "./emitted-message-interface";
import { IEmittedError } from "./errors/emitted-error-interface";
import { CouldNotJoinRoom, SocketError } from "./errors/socket-error";
import { IOHelper } from "./io-helper";
import { SocketManager } from "./socket-manager";
/**
 * class that handles the waiting and game rooms of the / namespace logic for socket.io sockets.
 */
class GameSocket extends SocketManager {
  private socket: socketIo.Socket;
  constructor(server: Server , socket: socketIo.Socket) {
    super(server);
    this.socket = socket;
  }

  private socketConfig() {
    this.socket.on("WAITING", () => {
      this.socketWaiting();
    });
  }

  private socketWaiting() {
    try {
    IOHelper.joinRoom(this.socket, "Waiting");
    const joinMessage: IEmittedMessage = {message: "Waiting for a match"};
    this.socket.emit("Joined Waiting Room", joinMessage);
    } catch (e) {
      if (e instanceof CouldNotJoinRoom) {
        const emittedError: IEmittedError = {
          error: "You could not join room",
          reason: "Internal error",
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

export {GameSocket};
