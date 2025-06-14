import { registerSW } from "virtual:pwa-register";

registerSW({
  onNeedRefresh() {
    // show "update available" toast
  },
  onOfflineReady() {
    // notify user they can use app offline
  },
});
