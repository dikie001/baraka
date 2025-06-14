import React from "react";
import ReactDOM from "react-dom/client";
import {App} from "./App.jsx";
import "./index.css";

import { registerSW } from "virtual:pwa-register";
registerSW(); // this line does the offline magic

ReactDOM.createRoot(document.getElementById("root")).render(
    <App />
);
// This code initializes a React application, registers a service worker for PWA capabilities, and renders the main App component into the root element of the HTML document. The application is styled with an external CSS file. The service worker enables offline functionality, allowing the app to work without an internet connection.