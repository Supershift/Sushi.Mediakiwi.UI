
export interface IFieldOption {
  text: string;
  value: string;
  isSelected: boolean;
  isEnabled: boolean;
}
export interface IOptionItem {
  text: string;
  value: string;
  enabled: boolean;
  selected: boolean;
}
export interface IOption {
  items: IOptionItem[];
  count: number;
}
