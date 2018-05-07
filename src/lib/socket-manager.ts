import {Server} from "http";
import socketIo from "socket.io";
import GameSocket from "./game-socket";
export default class SocketManager {
  public io: socketIo.Server;
  public server: Server;
  private gameSocket?: GameSocket;
  constructor(server: Server) {
    this.server = server;
    this.io = socketIo(this.server);
  }

  private socketInit(): void {
    this.io.on("connection", (socket) => {
      this.gameSocket = new GameSocket(this.io, socket);
    });
  }

  private getIONamespace(namespace?: string) {
    if (namespace) {
      return this.io.of(namespace);
    } else {
      return this.io.of("/");
    }
  }
}
