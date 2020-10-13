interface IEventHandlerBase {
  handler(data: any): any;
  getEventName(): string;
}
export default IEventHandlerBase;
