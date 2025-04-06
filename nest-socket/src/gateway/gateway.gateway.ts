import { OnModuleInit } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: '*',
})
export class GateWay implements OnModuleInit {
  @WebSocketServer()
  private server: Server;

  onModuleInit() {
    this.server.on('connection', (data) => {});
  }

  @SubscribeMessage('sendMessage')
  sendMessage(@MessageBody() body, @ConnectedSocket() client) {
    this.server.emit('message', body);
  }

  @SubscribeMessage('joinRoom')
  joinRoom(@MessageBody() roomId, @ConnectedSocket() client) {
    client.join(roomId);
  }

  @SubscribeMessage('onPrivateMessage')
  privateMessage(@MessageBody() body, @ConnectedSocket() client) {
    this.server.to(body.roomId).emit('privateMessage', body);
  }
}
