
export enum JSEventTypeEnum {
  none = 0,
  change = 1,
  click = 2,
  blur = 3,
  keyup = 4,
}

export function getEvents(eventType: JSEventTypeEnum) {
  let events: string[] = [];
  switch (eventType) {
    case JSEventTypeEnum.change:
      events = ["input", "change"];
      break;
    case JSEventTypeEnum.click:
      events = ["click"];
      break;
    case JSEventTypeEnum.blur:
      events = ["blur"];
      break;
    case JSEventTypeEnum.keyup:
      events = ["keyup"];
      break;
  }
  return events;
}
