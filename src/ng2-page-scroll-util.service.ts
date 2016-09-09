/**
 * Created by sebastianfuss on 02.09.16.
 */

export class PageScrollUtilService {

    /**
     * Util method to check whether a given variable is either undefined or null
     * @param variable
     * @returns {boolean} true the variable is undefined or null
     */
    public static isUndefinedOrNull(variable: any): boolean {
        return (typeof variable === 'undefined') || variable === undefined || variable === null;
    }

    public static extractElementPosition(document: Document, scrollTargetElement: HTMLElement): {top: number, left: number} {

        let body = document.body;
        let docEl = document.documentElement;

        let windowPageYOffset: number = document.defaultView && document.defaultView.pageYOffset || undefined;
        let windowPageXOffset: number = document.defaultView && document.defaultView.pageXOffset || undefined;

        let scrollTop = windowPageYOffset || docEl.scrollTop || body.scrollTop;
        let scrollLeft = windowPageXOffset || docEl.scrollLeft || body.scrollLeft;

        let clientTop = docEl.clientTop || body.clientTop || 0;
        let clientLeft = docEl.clientLeft || body.clientLeft || 0;


        if (PageScrollUtilService.isUndefinedOrNull(scrollTargetElement)) {
            // No element found, so return the current position to not cause any change in scroll position
            return {top: scrollTop, left: scrollLeft};
        }
        let box = scrollTargetElement.getBoundingClientRect();

        let top = box.top + scrollTop - clientTop;
        let left = box.left + scrollLeft - clientLeft;

        return {top: Math.round(top), left: Math.round(left)};
    }
}
