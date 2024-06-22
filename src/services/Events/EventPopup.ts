import { ReactElement } from "react";

export type EventPopupType = 'newPopup';

export interface EventPopupData {
    newPopup: NewPopupData;
}

export interface NewPopupData {
    Component: () => ReactElement;
}