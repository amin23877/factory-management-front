export function openRequestedSinglePopup({ url, windowName = "Phocus Popup" }: { url: string; windowName?: string }) {
  const options = ["resizable", "scrollbars", "width=1200px", "height=550px"];

  window.open(url, "_blank", options.join(","));
}
