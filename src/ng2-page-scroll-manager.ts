import {PageScrollConfig} from './ng2-page-scroll-config';
import {PageScrollService} from './ng2-page-scroll.service';

export class PageScrollManager {

    // Static Array containing all possibly running scroll animations
    private static runningInstances: PageScrollService[] = [];

    private static listener: EventListenerOrEventListenerObject = (event: Event): void => {
        // Stop the scroll animation if the user interferes with it
        if (event.type !== 'keyup' || PageScrollConfig._interruptKeys.indexOf((<KeyboardEvent>event).keyCode) >= 0) {
            PageScrollManager.stopAll();
        }
    };

    public static add(pageScrollService: PageScrollService) {
        this.runningInstances.push(pageScrollService);
    }

    public static stopAll(): boolean {
        if (PageScrollManager.runningInstances.length > 0) {
            PageScrollManager.runningInstances.forEach((pageScroll: PageScrollService, index: number) => {
                pageScroll.stop();
            });
            return true;
        }
        return false;
    }

    public static remove(pageScrollService: PageScrollService): boolean {
        let index: number = PageScrollManager.runningInstances.indexOf(pageScrollService);
        if (index >= 0) {
            PageScrollManager.runningInstances.splice(index, 1);
            return true;
        }
        return false;
    }

    public static attachInterfereListeners(body: HTMLBodyElement) {
        PageScrollConfig._interruptEvents.forEach((event: string) => body.addEventListener(event, PageScrollManager.listener));
    }

    public static detachInterfereListeners(body: HTMLBodyElement) {
        PageScrollConfig._interruptEvents.forEach((event: string) => body.removeEventListener(event, PageScrollManager.listener));
    }
}
