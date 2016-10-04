/**
 * Created by sebastianfuss on 03.09.16.
 */
"use strict";
var router_1 = require('@angular/router');
// Components
var simple_scroll_component_1 = require('./simple-scroll/simple-scroll.component');
var home_component_1 = require('./home/home.component');
var nested_scroll_component_1 = require('./nested-scroll/nested-scroll.component');
var translated_target_scroll_component_1 = require('./translated-target-scroll/translated-target-scroll.component');
var routes = [
    { path: '', component: home_component_1.HomeComponent },
    { path: 'simple', component: simple_scroll_component_1.SimpleScrollComponent },
    { path: 'nested', component: nested_scroll_component_1.NestedScrollComponent },
    { path: 'translated', component: translated_target_scroll_component_1.TranslatedTargetScrollComponent },
];
exports.appRoutingProviders = [];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routes.js.map