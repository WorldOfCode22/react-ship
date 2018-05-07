import socketIo from "socket.io";
import { IEmittedMessage } from "./emitted-message-interface";
import { CouldNotGetClientsException, CouldNotJoinRoomException} from "./errors/socket-error";
/**
 * static class that handles some basic IO functions.
 */
class IOHelper {

  public static joinRoom(socket: socketIo.Socket, room: string): Promise<void> {
    return new Promise((resolve, reject) => {
      socket.join(room, (err) => {
        if (err) {
          reject(new CouldNotJoinRoomException(socket, room, err));
        } else { resolve(); }
      });
    });
  }

  public static getUsersInRoom(io: socketIo.Server, room: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      io.of("/").clients((err: any, clients: string[]) => {
        if (err) { reject(new CouldNotGetClientsException(err)); } else { resolve(clients); }
      });
    });
  }

  public static async makeMatch(io: socketIo.Server, clientList: string[]) {
    // get sockets from socket id
    const allClients = io.of("/").sockets;
    const user1 = allClients[clientList[0]];
    const user2 = allClients[clientList[1]];
    // find number of game rooms
    const numberOfClientsInGameRooms = await IOHelper.getUsersInRoom(io, "Game");
    const numberOfGameRooms = numberOfClientsInGameRooms.length / 2;
    const room = numberOfGameRooms + 1;
    // both user join master game room
    await IOHelper.joinRoom(user1, "Game ");
    await IOHelper.joinRoom(user2, "Game ");
    // both users join their game
    await IOHelper.joinRoom(user1, "Game " + room);
    await IOHelper.joinRoom(user2, "Game " + room);
    // notify users they joined a game
    const emittedMessage: IEmittedMessage = {message: "Joined game room " + room};
    user1.emit("Joined Game", emittedMessage);
    user2.emit("Joined Game", emittedMessage);
  }
}

export {IOHelper};
