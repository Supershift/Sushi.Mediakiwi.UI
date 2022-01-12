import { IButton } from "./IButton";
import { IField } from "./IField";

export interface IForm {
    className: string;
    fields?: IField[];
    buttons?: IButton[],
    title: string
}