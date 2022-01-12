export enum ViewTypeEnum {
  fileUpload = 1,
}

export function getViewTypeName(viewType: ViewTypeEnum) {
  if (!viewType) {
    return null;
  }
  switch (viewType) {
    case ViewTypeEnum.fileUpload:
      return "FileUpload";
    default:
      return null;
  }
}
