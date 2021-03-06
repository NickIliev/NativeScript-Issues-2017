"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_view_model_1 = require("./main-view-model");
var dialogs = require("ui/dialogs");
function navigatingTo(args) {
    var page = args.object;
    page.bindingContext = new main_view_model_1.HelloWorldModel();
}
exports.navigatingTo = navigatingTo;
function onLoaded(args) {
    var options = {
        title: "Race Selection",
        message: "Race Chosen: Elf",
        okButtonText: "OK"
    };
    var alertDialog = dialogs.alert(options);
    alertDialog.then(function () {
        console.log("Race Chosen!");
    });
    console.log("alertDialog");
    console.dir(alertDialog);
}
exports.onLoaded = onLoaded;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1wYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFpbi1wYWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEscURBQW9EO0FBRXBELG9DQUFzQztBQUV0QyxzQkFBNkIsSUFBZTtJQUV4QyxJQUFJLElBQUksR0FBUyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBRTdCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQ0FBZSxFQUFFLENBQUM7QUFDaEQsQ0FBQztBQUxELG9DQUtDO0FBRUQsa0JBQXlCLElBQWU7SUFDcEMsSUFBSSxPQUFPLEdBQUc7UUFDVixLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLE9BQU8sRUFBRSxrQkFBa0I7UUFDM0IsWUFBWSxFQUFFLElBQUk7S0FDckIsQ0FBQztJQUNGLElBQUksV0FBVyxHQUFRLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7SUFFOUMsV0FBVyxDQUFDLElBQUksQ0FBQztRQUNiLE9BQU8sQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0lBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFN0IsQ0FBQztBQWZELDRCQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRXZlbnREYXRhIH0gZnJvbSAnZGF0YS9vYnNlcnZhYmxlJztcbmltcG9ydCB7IFBhZ2UgfSBmcm9tICd1aS9wYWdlJztcbmltcG9ydCB7IEhlbGxvV29ybGRNb2RlbCB9IGZyb20gJy4vbWFpbi12aWV3LW1vZGVsJztcblxuaW1wb3J0ICogYXMgZGlhbG9ncyBmcm9tIFwidWkvZGlhbG9nc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gbmF2aWdhdGluZ1RvKGFyZ3M6IEV2ZW50RGF0YSkge1xuXG4gICAgbGV0IHBhZ2UgPSA8UGFnZT5hcmdzLm9iamVjdDtcblxuICAgIHBhZ2UuYmluZGluZ0NvbnRleHQgPSBuZXcgSGVsbG9Xb3JsZE1vZGVsKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvbkxvYWRlZChhcmdzOiBFdmVudERhdGEpIHtcbiAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgdGl0bGU6IFwiUmFjZSBTZWxlY3Rpb25cIixcbiAgICAgICAgbWVzc2FnZTogXCJSYWNlIENob3NlbjogRWxmXCIsXG4gICAgICAgIG9rQnV0dG9uVGV4dDogXCJPS1wiXG4gICAgfTtcbiAgICB2YXIgYWxlcnREaWFsb2c6IGFueSA9IGRpYWxvZ3MuYWxlcnQob3B0aW9ucyk7XG5cbiAgICBhbGVydERpYWxvZy50aGVuKCgpID0+IHtcbiAgICAgICAgY29uc29sZS5sb2coXCJSYWNlIENob3NlbiFcIik7XG4gICAgfSk7XG5cbiAgICBjb25zb2xlLmxvZyhcImFsZXJ0RGlhbG9nXCIpO1xuICAgIGNvbnNvbGUuZGlyKGFsZXJ0RGlhbG9nKTtcblxufSJdfQ==