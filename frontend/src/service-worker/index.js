import { API_HOST } from "../config";
import runtime from "serviceworker-webpack-plugin/lib/runtime";

const publicVapidKey =
  "BLGf4odvx8PEcK5pdvaHw0qBPobyhynHYCHVk5jpcZnQBlug6IiSxuNrJuQtzjmBpwzXnLkZss6t_4osuBJT5BQ";

function requestPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = window.Notification.requestPermission(function(
      result
    ) {
      // Handling deprecated version with callback.
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(permissionResult => {
    if (permissionResult !== "granted") {
      throw new Error("Permission not granted.");
    }
  });
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

async function register() {
  return runtime.register();
}

async function subscribe(token) {
  if (!registration) {
    throw new Error(
      "Cannot enable push: Service worker registration not available"
    );
  }

  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    // The `urlBase64ToUint8Array()` function is the same as in
    // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  await window.fetch(API_HOST + "/push-subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json"
    }
  });
}

let registration;
export async function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    registration = await register();
  } else {
    console.warn("Service worker not supported");
  }
}

export const isPushSupported = () => "PushManager" in window;

export async function setupPush(token) {
  if (isPushSupported()) {
    await requestPermission();
    await subscribe(token);
  } else {
    console.warn("Push notifications not supported");
  }
}
