import { topNavFullWidthBreakPoint } from './TopNav';

export const popupNavBreakpoint = topNavFullWidthBreakPoint;
export const popupNavMediaQuery = `screen and (max-width: ${popupNavBreakpoint})`;
export const staticNavMediaQuery = `not screen and (max-width: ${popupNavBreakpoint})`;
