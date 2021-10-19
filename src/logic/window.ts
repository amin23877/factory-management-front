let windowObjectReference: Window | null = null;
let PreviousUrl: string | null | undefined; // global variable that will store the url currently in the secondary window

export function openRequestedSinglePopup({
    url,
    single,
    windowName = "Phocus Popup",
}: {
    url: string;
    single?: boolean;
    windowName?: string;
}) {
    const options = ["resizable", "scrollbars", "width=900px", "height=550px"];

    if (windowObjectReference == null || windowObjectReference.closed) {
        windowObjectReference = window.open(url, windowName, options.join(","));
    } else if (PreviousUrl !== url && single) {
        windowObjectReference = window.open(url, windowName, options.join(","));
        /* if the resource to load is different,
       then we load it in the already opened secondary window and then
       we bring such window back on top/in front of its parent window. */
        windowObjectReference?.focus();
    } else {
        windowObjectReference.focus();
    }

    PreviousUrl = url;
    /* explanation: we store the current url in order to compare url
     in the event of another call of this function. */
}
