
export enum MediakiwiJSEventType {
  none = 0,
  change = 1,
  click = 2,
  blur = 3,
  keyup = 4,
}

export function getEvents(eventType: MediakiwiJSEventType) {
  let events: string[] = [];
  switch (eventType) {
    case MediakiwiJSEventType.change:
      events = ["input", "change"];
      break;
    case MediakiwiJSEventType.click:
      events = ["click"];
      break;
    case MediakiwiJSEventType.blur:
      events = ["blur"];
      break;
    case MediakiwiJSEventType.keyup:
      events = ["keyup"];
      break;
  }
  return events;
}
