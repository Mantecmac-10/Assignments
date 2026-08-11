export class WsMessage<T> {
  event: string;
  data: T;

  constructor(event: string, data: T) {
    this.event = event;
    this.data = data;
  }
}
