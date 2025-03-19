"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var AuthContext_1 = require("./contexts/AuthContext");
var VideoContext_1 = require("./contexts/VideoContext");
var MetricsContext_1 = require("./contexts/MetricsContext");
var Layout_1 = require("./components/Layout");
var Login_1 = require("./pages/Login");
var Videos_1 = require("./pages/Videos");
var Dashboard_1 = require("./pages/Dashboard");
require("./styles/tailwind.css");
var App = function () {
    return (<AuthContext_1.AuthProvider>
      <VideoContext_1.VideoProvider>
        <MetricsContext_1.MetricsProvider>
          <react_router_dom_1.BrowserRouter>
            <react_router_dom_1.Routes>
              <react_router_dom_1.Route path="/login" element={<Login_1.default />}/>
              <react_router_dom_1.Route path="/" element={<Layout_1.default />}>
                <react_router_dom_1.Route index element={<react_router_dom_1.Navigate to="/videos" replace/>}/>
                <react_router_dom_1.Route path="videos" element={<Videos_1.default />}/>
                <react_router_dom_1.Route path="dashboard" element={<Dashboard_1.default />}/>
              </react_router_dom_1.Route>
              <react_router_dom_1.Route path="*" element={<react_router_dom_1.Navigate to="/videos" replace/>}/>
            </react_router_dom_1.Routes>
          </react_router_dom_1.BrowserRouter>
        </MetricsContext_1.MetricsProvider>
      </VideoContext_1.VideoProvider>
    </AuthContext_1.AuthProvider>);
};
exports.default = App;
