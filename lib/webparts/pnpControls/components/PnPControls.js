"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sp_1 = require("@pnp/sp");
var PnPControls = (function (_super) {
    __extends(PnPControls, _super);
    /**
     * Constructor
     * @param props
     */
    function PnPControls(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            webParts: [],
            components: [],
            urlPage: _this._getLinkPage(),
            titlePage: _this._getTitlePage(),
            idera: false,
            siteHome: '/sites/' + _this._getTitlePage() + '/SitePages/Home.aspx' // --> "/sites/modern/SitePages/Home.aspx"
        };
        return _this;
    }
    /**
     * componentDidMount lifecycle hook
     */
    PnPControls.prototype.componentDidMount = function () {
        this._main();
    };
    /**
     * main method
     */
    PnPControls.prototype._main = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._deepControlSearch()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this._idera()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * get full url page
     */
    PnPControls.prototype._getLinkPage = function () {
        var linkPage = this.props.context.pageContext.web.absoluteUrl;
        return linkPage + '/SitePages/Home.aspx';
    };
    /**
     * get title page
     */
    PnPControls.prototype._getTitlePage = function () {
        return this.props.context.pageContext.web.title;
    };
    /**
     * getting the 'idera' parameter from the url link 'http://ws19-sp19-sql17:1000/sites/modern/SitePages/Home.aspx?idera=true'
     * if idera=true then show the list
     * if idera=false  show nothing.
     */
    PnPControls.prototype._idera = function () {
        var completeURL = new URLSearchParams(location.search);
        var hasIdera = completeURL.has('idera');
        if (hasIdera) {
            var valueIdera = completeURL.get('idera');
            if (valueIdera === 'true') {
                this.setState({
                    idera: true
                });
            }
        }
    };
    /**
     * method in order to search all the controllers in the page, saving them one by one.
     * so far there are two types of components saved (webparts and webcomponents)
     */
    PnPControls.prototype._deepControlSearch = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var file, page, partDefs;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        file = sp_1.sp.web.getFileByServerRelativePath(this.state.siteHome);
                        return [4 /*yield*/, sp_1.ClientSidePage.fromFile(file)];
                    case 1:
                        page = _a.sent();
                        return [4 /*yield*/, sp_1.sp.web.getClientSideWebParts()];
                    case 2:
                        partDefs = _a.sent();
                        page.sections.forEach(function (section) {
                            var canvasColumn = section.columns; //COLUMNS
                            canvasColumn.forEach(function (column) {
                                var controls = column.controls; //CONTROLS        
                                controls.forEach(function (control) {
                                    var webPart = control; //EACH  CONTROL IS A WEB-PART 
                                    _this.setState({
                                        webParts: _this.state.webParts.concat([webPart])
                                    });
                                });
                            });
                        });
                        partDefs.forEach(function (webPart) {
                            _this.setState({
                                components: _this.state.components.concat([webPart])
                            });
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * method in order to show all the controllers founded in the page.{webparts and webcomponents}
     */
    PnPControls.prototype.loadingControllers = function () {
        var webParts = this.state.webParts.map(function (wp) {
            return React.createElement("div", { key: wp.id },
                React.createElement("h3", null,
                    " ",
                    wp.title,
                    " "),
                React.createElement("p", null,
                    " WebPartID: ",
                    wp.webPartId,
                    " "),
                React.createElement("p", null,
                    " Description: ",
                    wp.description,
                    " "));
        });
        var components = this.state.components.map(function (cp) {
            return React.createElement("div", { key: cp.id },
                React.createElement("h3", null,
                    " ",
                    cp.Name,
                    " "),
                React.createElement("p", null,
                    " Id: ",
                    cp.Id,
                    " "),
                React.createElement("p", null,
                    " Status: ",
                    cp.Status,
                    " "));
        });
        if (this.state.idera) {
            return (React.createElement("div", null,
                React.createElement("h2", null, " WEB PARTS "),
                React.createElement("h3", null,
                    "number # ",
                    webParts.length,
                    " [webParts]"),
                webParts,
                React.createElement("h2", null, " COMPONENTS "),
                React.createElement("h3", null,
                    "number # ",
                    components.length,
                    " [components]"),
                components));
        }
    };
    /**
     * React render method
     */
    PnPControls.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement("h2", null,
                "TITLE: ",
                this.state.titlePage),
            React.createElement("h2", null,
                "URL : ",
                this.state.urlPage),
            this.loadingControllers()));
    };
    return PnPControls;
}(React.Component));
exports.default = PnPControls;

//# sourceMappingURL=PnPControls.js.map
