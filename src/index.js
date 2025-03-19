"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var client_1 = require("react-dom/client");
var react_router_dom_1 = require("react-router-dom");
// Import styles
require("./styles/tailwind.css");
// Import pages
var Dashboard_1 = require("./pages/Dashboard");
var Videos_1 = require("./pages/Videos");
var Login_1 = require("./pages/Login");
var Layout_1 = require("./components/Layout");
// Context providers
var AuthContext_1 = require("./contexts/AuthContext");
var VideoContext_1 = require("./contexts/VideoContext");
var App = function () {
    return (<react_router_dom_1.BrowserRouter>
      <AuthContext_1.AuthProvider>
        <VideoContext_1.VideoProvider>
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
            <react_router_dom_1.Route path="/" element={<Layout_1.default />}>
              <react_router_dom_1.Route index element={<Videos_1.default />}/>
              <react_router_dom_1.Route path="dashboard" element={<Dashboard_1.default />}/>
            </react_router_dom_1.Route>
          </react_router_dom_1.Routes>
        </VideoContext_1.VideoProvider>
      </AuthContext_1.AuthProvider>
    </react_router_dom_1.BrowserRouter>);
};
// Initialize the app
var container = document.getElementById('root');
if (container) {
    var root = (0, client_1.createRoot)(container);
    root.render(<react_1.default.StrictMode>
      <App />
    </react_1.default.StrictMode>);
}
else {
    console.error('Root element not found');
}
