abstract class EventQueue {
  protected _eventQuene: Array<Function> = [];
  public addEventListener(event: Function): void {
    this._eventQuene.push(event);
  }
  public removeEventListener(event: Function): void {
    const index = this._eventQuene.indexOf(event);
    if (index > -1) {
      this._eventQuene.splice(index, 1);
    }
  }
  public abstract excuteEventQueue(event: Function): void;
}

/**
 * 监听事件队列
 * 每次触发都 遍历执行
 */
export class MonitorEventQueue extends EventQueue {
  public excuteEventQueue(): void {
    this._eventQuene.forEach((event) => event());
  }
}

/**
 * 队列中的只执行一次，执行完以后，出栈
 */
export class StackEventQueen extends EventQueue {
  public excuteEventQueue(): void {
    const excuteEventQueue = this._eventQuene;
    this._eventQuene = [];
    excuteEventQueue.forEach((event) => event());
  }
}
