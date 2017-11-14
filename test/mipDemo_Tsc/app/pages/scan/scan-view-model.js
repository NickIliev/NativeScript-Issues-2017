"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import observable = require("data/observable");
var observable_array_1 = require("data/observable-array");
var bluetooth_scanner_1 = require("nativescript-mip-ble/bluetooth.scanner");
var mip_device_1 = require("nativescript-mip-ble/mip-device");
var all_mips_1 = require("../../all-mips");
var ScanViewModel = (function () {
    function ScanViewModel() {
        //super();
        this.scanner = new bluetooth_scanner_1.BluetoothScanner();
        this.scanner.initialisePermissionsIfRequired();
        this.devicesAround = new observable_array_1.ObservableArray();
        this.devicesAround.push(new mip_device_1.MipDevice("B4:99:4C:48:14:24", "Test", "who knows?"));
    }
    ScanViewModel.prototype.getPermissions = function () {
        this.scanner.initialisePermissionsIfRequired();
    };
    ScanViewModel.prototype.connect = function (args) {
        var mipDevice = this.devicesAround.getItem(args.index);
        mipDevice.connect(this.onDisconnected)
            .then(function (UUID) {
            all_mips_1.AllMips.addMipDevice(mipDevice);
            alert("Device Connected");
        });
    };
    ScanViewModel.prototype.scan = function (eventData) {
        var listView = eventData.object;
        this.devicesAround.splice(0);
        this.scanner.scan(this.onRobotFound)
            .then(function () {
            listView.notifyPullToRefreshFinished();
        }, function (err) {
            listView.notifyPullToRefreshFinished();
            alert("error while scanning: " + err);
        });
    };
    ScanViewModel.prototype.onRobotFound = function (mip) {
        exports.Scanner.devicesAround.push(mip);
    };
    ScanViewModel.prototype.onDisconnected = function (mip) {
        all_mips_1.AllMips.removeMip(mip);
    };
    return ScanViewModel;
}());
exports.ScanViewModel = ScanViewModel;
exports.Scanner = new ScanViewModel();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nhbi12aWV3LW1vZGVsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nhbi12aWV3LW1vZGVsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQWlEO0FBQ2pELDBEQUF3RDtBQUV4RCw0RUFBMEU7QUFDMUUsOERBQTREO0FBSTVELDJDQUF5QztBQUV6QztJQUtJO1FBQ0ksVUFBVTtRQUVWLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxvQ0FBZ0IsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxPQUFPLENBQUMsK0JBQStCLEVBQUUsQ0FBQztRQUUvQyxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksa0NBQWUsRUFBYSxDQUFDO1FBQ3RELElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksc0JBQVMsQ0FBQyxtQkFBbUIsRUFBRSxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBR00sc0NBQWMsR0FBckI7UUFDSSxJQUFJLENBQUMsT0FBTyxDQUFDLCtCQUErQixFQUFFLENBQUM7SUFDbkQsQ0FBQztJQUVNLCtCQUFPLEdBQWQsVUFBZSxJQUFJO1FBQ2YsSUFBSSxTQUFTLEdBQWMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xFLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQzthQUNqQyxJQUFJLENBQUMsVUFBQyxJQUFJO1lBQ1Asa0JBQU8sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDaEMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUIsQ0FBQyxDQUFDLENBQUE7SUFDVixDQUFDO0lBRU0sNEJBQUksR0FBWCxVQUFZLFNBQTRCO1FBQ3BDLElBQUksUUFBUSxHQUFnQixTQUFTLENBQUMsTUFBTSxDQUFDO1FBRTdDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRTdCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDL0IsSUFBSSxDQUNMO1lBQ0ksUUFBUSxDQUFDLDJCQUEyQixFQUFFLENBQUM7UUFDM0MsQ0FBQyxFQUNELFVBQUMsR0FBRztZQUNBLFFBQVEsQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyx3QkFBd0IsR0FBRyxHQUFHLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNYLENBQUM7SUFFTyxvQ0FBWSxHQUFwQixVQUFxQixHQUFjO1FBQy9CLGVBQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7SUFFTyxzQ0FBYyxHQUF0QixVQUF1QixHQUFjO1FBQ2pDLGtCQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFDTCxvQkFBQztBQUFELENBQUMsQUFwREQsSUFvREM7QUFwRFksc0NBQWE7QUFzRGYsUUFBQSxPQUFPLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vaW1wb3J0IG9ic2VydmFibGUgPSByZXF1aXJlKFwiZGF0YS9vYnNlcnZhYmxlXCIpO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZUFycmF5IH0gZnJvbSBcImRhdGEvb2JzZXJ2YWJsZS1hcnJheVwiO1xuaW1wb3J0ICogYXMgZnJhbWVNb2R1bGUgZnJvbSBcInVpL2ZyYW1lXCI7XG5pbXBvcnQgeyBCbHVldG9vdGhTY2FubmVyIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1taXAtYmxlL2JsdWV0b290aC5zY2FubmVyXCI7XG5pbXBvcnQgeyBNaXBEZXZpY2UgfSBmcm9tIFwibmF0aXZlc2NyaXB0LW1pcC1ibGUvbWlwLWRldmljZVwiO1xuLy9pbXBvcnQge01pcERldmljZX0gZnJvbSBcIi4uLy4uL3NlcnZpY2VzL21pcC1kZXZpY2VcIjtcblxuaW1wb3J0IHsgUmFkTGlzdFZpZXcsIExpc3RWaWV3RXZlbnREYXRhIH0gZnJvbSBcIm5hdGl2ZXNjcmlwdC1wcm8tdWkvbGlzdHZpZXdcIjtcbmltcG9ydCB7IEFsbE1pcHMgfSBmcm9tIFwiLi4vLi4vYWxsLW1pcHNcIjtcblxuZXhwb3J0IGNsYXNzIFNjYW5WaWV3TW9kZWwgey8vIGV4dGVuZHMgb2JzZXJ2YWJsZS5PYnNlcnZhYmxlIHtcblxuICAgIHB1YmxpYyBzY2FubmVyOiBCbHVldG9vdGhTY2FubmVyO1xuICAgIHB1YmxpYyBkZXZpY2VzQXJvdW5kOiBPYnNlcnZhYmxlQXJyYXk8TWlwRGV2aWNlPjtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICAvL3N1cGVyKCk7XG5cbiAgICAgICAgdGhpcy5zY2FubmVyID0gbmV3IEJsdWV0b290aFNjYW5uZXIoKTtcbiAgICAgICAgdGhpcy5zY2FubmVyLmluaXRpYWxpc2VQZXJtaXNzaW9uc0lmUmVxdWlyZWQoKTtcblxuICAgICAgICB0aGlzLmRldmljZXNBcm91bmQgPSBuZXcgT2JzZXJ2YWJsZUFycmF5PE1pcERldmljZT4oKTtcbiAgICAgICAgdGhpcy5kZXZpY2VzQXJvdW5kLnB1c2gobmV3IE1pcERldmljZShcIkI0Ojk5OjRDOjQ4OjE0OjI0XCIsIFwiVGVzdFwiLCBcIndobyBrbm93cz9cIikpO1xuICAgIH1cblxuXG4gICAgcHVibGljIGdldFBlcm1pc3Npb25zKCkge1xuICAgICAgICB0aGlzLnNjYW5uZXIuaW5pdGlhbGlzZVBlcm1pc3Npb25zSWZSZXF1aXJlZCgpO1xuICAgIH1cblxuICAgIHB1YmxpYyBjb25uZWN0KGFyZ3MpIHtcbiAgICAgICAgdmFyIG1pcERldmljZTogTWlwRGV2aWNlID0gdGhpcy5kZXZpY2VzQXJvdW5kLmdldEl0ZW0oYXJncy5pbmRleCk7XG4gICAgICAgIG1pcERldmljZS5jb25uZWN0KHRoaXMub25EaXNjb25uZWN0ZWQpXG4gICAgICAgICAgICAudGhlbigoVVVJRCkgPT4ge1xuICAgICAgICAgICAgICAgIEFsbE1pcHMuYWRkTWlwRGV2aWNlKG1pcERldmljZSk7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJEZXZpY2UgQ29ubmVjdGVkXCIpO1xuICAgICAgICAgICAgfSlcbiAgICB9XG5cbiAgICBwdWJsaWMgc2NhbihldmVudERhdGE6IExpc3RWaWV3RXZlbnREYXRhKSB7XG4gICAgICAgIHZhciBsaXN0VmlldzogUmFkTGlzdFZpZXcgPSBldmVudERhdGEub2JqZWN0O1xuXG4gICAgICAgIHRoaXMuZGV2aWNlc0Fyb3VuZC5zcGxpY2UoMCk7XG5cbiAgICAgICAgdGhpcy5zY2FubmVyLnNjYW4odGhpcy5vblJvYm90Rm91bmQpXG4gICAgICAgICAgICAudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICBsaXN0Vmlldy5ub3RpZnlQdWxsVG9SZWZyZXNoRmluaXNoZWQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgICAgbGlzdFZpZXcubm90aWZ5UHVsbFRvUmVmcmVzaEZpbmlzaGVkKCk7XG4gICAgICAgICAgICAgICAgYWxlcnQoXCJlcnJvciB3aGlsZSBzY2FubmluZzogXCIgKyBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBvblJvYm90Rm91bmQobWlwOiBNaXBEZXZpY2UpIHtcbiAgICAgICAgU2Nhbm5lci5kZXZpY2VzQXJvdW5kLnB1c2gobWlwKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIG9uRGlzY29ubmVjdGVkKG1pcDogTWlwRGV2aWNlKSB7XG4gICAgICAgIEFsbE1pcHMucmVtb3ZlTWlwKG1pcCk7XG4gICAgfVxufVxuXG5leHBvcnQgdmFyIFNjYW5uZXIgPSBuZXcgU2NhblZpZXdNb2RlbCgpOyJdfQ==