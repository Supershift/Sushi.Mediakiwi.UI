export enum ViewType {
  fileUpload = 1,
}

export function getViewTypeName(viewType: ViewType) {
  if (!viewType) {
    return null;
  }
  switch (viewType) {
    case ViewType.fileUpload:
      return "FileUpload";
    default:
      return null;
  }
}
