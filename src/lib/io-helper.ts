import socketIo from "socket.io";
import { CouldNotJoinRoom } from "./errors/socket-error";
/**
 * static class that handles some basic IO functions.
 */
class IOHelper {

  public static joinRoom(socket: socketIo.Socket, room: string): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.join(room, (err) => {
        if (err) {
          reject(new CouldNotJoinRoom(socket, room, err));
        } else { resolve(); }
      });
    });
  }

}

export {IOHelper};
