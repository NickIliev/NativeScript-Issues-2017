"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./bundle-config");
var app = require("application");
var application_1 = require("application");
var MyDelegate = (function (_super) {
    __extends(MyDelegate, _super);
    function MyDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        console.log("applicationWillFinishLaunchingWithOptions: " + launchOptions);
        return true;
    };
    MyDelegate.prototype.applicationDidBecomeActive = function (application) {
        console.log("applicationDidBecomeActive: " + application);
    };
    MyDelegate.prototype.applicationWillResignActive = function (application) {
        console.log("applicationWillResignActive");
    };
    MyDelegate.prototype.applicationWillTerminate = function (application) {
        console.log("applicationWillTerminate: " + application);
    };
    MyDelegate.ObjCProtocols = [UIApplicationDelegate];
    return MyDelegate;
}(UIResponder));
application_1.ios.delegate = MyDelegate;
app.start({ moduleName: 'main-page' });
/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsMkJBQXlCO0FBQ3pCLGlDQUFtQztBQUNuQywyQ0FBNkQ7QUFFN0Q7SUFBeUIsOEJBQVc7SUFBcEM7O0lBb0JBLENBQUM7SUFqQkcsNkRBQXdDLEdBQXhDLFVBQXlDLFdBQTBCLEVBQUUsYUFBa0I7UUFDbkYsT0FBTyxDQUFDLEdBQUcsQ0FBQyw2Q0FBNkMsR0FBRyxhQUFhLENBQUMsQ0FBQTtRQUUxRSxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCwrQ0FBMEIsR0FBMUIsVUFBMkIsV0FBMEI7UUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQyw4QkFBOEIsR0FBRyxXQUFXLENBQUMsQ0FBQTtJQUM3RCxDQUFDO0lBRUQsZ0RBQTJCLEdBQTNCLFVBQTRCLFdBQTBCO1FBQ2xELE9BQU8sQ0FBQyxHQUFHLENBQUMsNkJBQTZCLENBQUMsQ0FBQTtJQUM5QyxDQUFDO0lBRUQsNkNBQXdCLEdBQXhCLFVBQXlCLFdBQTBCO1FBQy9DLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsV0FBVyxDQUFDLENBQUM7SUFDNUQsQ0FBQztJQWxCYSx3QkFBYSxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQW1CMUQsaUJBQUM7Q0FBQSxBQXBCRCxDQUF5QixXQUFXLEdBb0JuQztBQUNELGlCQUFHLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztBQUUxQixHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7QUFFdkM7OztFQUdFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFwiLi9idW5kbGUtY29uZmlnXCI7XG5pbXBvcnQgKiBhcyBhcHAgZnJvbSAnYXBwbGljYXRpb24nO1xuaW1wb3J0IHsgaW9zLCBzdGFydCBhcyBhcHBsaWNhdGlvblN0YXJ0IH0gZnJvbSBcImFwcGxpY2F0aW9uXCI7XG5cbmNsYXNzIE15RGVsZWdhdGUgZXh0ZW5kcyBVSVJlc3BvbmRlciBpbXBsZW1lbnRzIFVJQXBwbGljYXRpb25EZWxlZ2F0ZSB7XG4gICAgcHVibGljIHN0YXRpYyBPYmpDUHJvdG9jb2xzID0gW1VJQXBwbGljYXRpb25EZWxlZ2F0ZV07XG5cbiAgICBhcHBsaWNhdGlvbkRpZEZpbmlzaExhdW5jaGluZ1dpdGhPcHRpb25zKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uLCBsYXVuY2hPcHRpb25zOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJhcHBsaWNhdGlvbldpbGxGaW5pc2hMYXVuY2hpbmdXaXRoT3B0aW9uczogXCIgKyBsYXVuY2hPcHRpb25zKVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGFwcGxpY2F0aW9uRGlkQmVjb21lQWN0aXZlKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGljYXRpb25EaWRCZWNvbWVBY3RpdmU6IFwiICsgYXBwbGljYXRpb24pXG4gICAgfVxuXG4gICAgYXBwbGljYXRpb25XaWxsUmVzaWduQWN0aXZlKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGljYXRpb25XaWxsUmVzaWduQWN0aXZlXCIpXG4gICAgfVxuXG4gICAgYXBwbGljYXRpb25XaWxsVGVybWluYXRlKGFwcGxpY2F0aW9uOiBVSUFwcGxpY2F0aW9uKTogdm9pZCB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiYXBwbGljYXRpb25XaWxsVGVybWluYXRlOiBcIiArIGFwcGxpY2F0aW9uKTtcbiAgICB9XG59XG5pb3MuZGVsZWdhdGUgPSBNeURlbGVnYXRlO1xuXG5hcHAuc3RhcnQoeyBtb2R1bGVOYW1lOiAnbWFpbi1wYWdlJyB9KTtcblxuLypcbkRvIG5vdCBwbGFjZSBhbnkgY29kZSBhZnRlciB0aGUgYXBwbGljYXRpb24gaGFzIGJlZW4gc3RhcnRlZCBhcyBpdCB3aWxsIG5vdFxuYmUgZXhlY3V0ZWQgb24gaU9TLlxuKi9cbiJdfQ==