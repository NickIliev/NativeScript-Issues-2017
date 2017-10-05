"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("tns-core-modules/color");
var platform_1 = require("tns-core-modules/platform");
var cardview_common_1 = require("./cardview-common");
var CardView = (function (_super) {
    __extends(CardView, _super);
    function CardView() {
        var _this = _super.call(this) || this;
        var width = platform_1.screen.mainScreen.widthDIPs - 20;
        _this.nativeView = new UIView(CGRectMake(10, 30, width, 0));
        _this.nativeView.layer.masksToBounds = false;
        _this.shadowColor = "black";
        _this.radius = 1;
        _this.shadowRadius = 1;
        _this.shadowOpacity = 0.4;
        _this.shadowOffsetHeight = 2;
        _this.shadowOffsetWidth = 0;
        return _this;
    }
    Object.defineProperty(CardView.prototype, "ios", {
        get: function () {
            return this.nativeView;
        },
        enumerable: true,
        configurable: true
    });
    CardView.prototype[cardview_common_1.radiusProperty.setNative] = function (value) {
        this.nativeView.layer.cornerRadius = value;
    };
    CardView.prototype[cardview_common_1.radiusProperty.getDefault] = function () {
        return this.nativeView.layer.cornerRadius;
    };
    CardView.prototype[cardview_common_1.backgroundColorProperty.setNative] = function (value) {
        this.nativeView.backgroundColor = value.ios;
    };
    CardView.prototype[cardview_common_1.backgroundInternalProperty.setNative] = function (value) {
        this.nativeView.backgroundColor = new color_1.Color(value.color + "").ios;
    };
    CardView.prototype[cardview_common_1.shadowRadiusProperty.setNative] = function (value) {
        this.nativeView.layer.shadowRadius = value;
    };
    CardView.prototype[cardview_common_1.shadowOffsetWidthProperty.setNative] = function (value) {
        this.nativeView.layer.shadowOffset = CGSizeMake(value, this.nativeView.layer.shadowOffset.height);
    };
    CardView.prototype[cardview_common_1.shadowOffsetHeightProperty.setNative] = function (value) {
        this.nativeView.layer.shadowOffset = CGSizeMake(this.nativeView.layer.shadowOffset.width, value);
    };
    CardView.prototype[cardview_common_1.shadowColorProperty.setNative] = function (value) {
        this.nativeView.layer.shadowColor = value.ios.CGColor;
    };
    CardView.prototype[cardview_common_1.shadowOpacityProperty.setNative] = function (value) {
        this.nativeView.layer.shadowOpacity = value;
    };
    return CardView;
}(cardview_common_1.CardViewCommon));
exports.CardView = CardView;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZHZpZXcuaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2FyZHZpZXcuaW9zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQStDO0FBQy9DLHNEQUFtRDtBQUNuRCxxREFVMkI7QUFJM0I7SUFBOEIsNEJBQWM7SUFDMUM7UUFBQSxZQUNFLGlCQUFPLFNBVVI7UUFUQyxJQUFJLEtBQUssR0FBRyxpQkFBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQzdDLEtBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDM0QsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztRQUM1QyxLQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMzQixLQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUNoQixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztRQUN0QixLQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQztRQUN6QixLQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzVCLEtBQUksQ0FBQyxpQkFBaUIsR0FBRyxDQUFDLENBQUM7O0lBQzdCLENBQUM7SUFFRCxzQkFBSSx5QkFBRzthQUFQO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7UUFDekIsQ0FBQzs7O09BQUE7SUFFRCxtQkFBQyxnQ0FBYyxDQUFDLFNBQVMsQ0FBQyxHQUExQixVQUEyQixLQUFhO1FBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVELG1CQUFDLGdDQUFjLENBQUMsVUFBVSxDQUFDLEdBQTNCO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQztJQUM1QyxDQUFDO0lBRUQsbUJBQUMseUNBQXVCLENBQUMsU0FBUyxDQUFDLEdBQW5DLFVBQW9DLEtBQVk7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQztJQUM5QyxDQUFDO0lBRUQsbUJBQUMsNENBQTBCLENBQUMsU0FBUyxDQUFDLEdBQXRDLFVBQXVDLEtBQUs7UUFDMUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLEdBQUcsSUFBSSxhQUFLLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUM7SUFDcEUsQ0FBQztJQUVELG1CQUFDLHNDQUFvQixDQUFDLFNBQVMsQ0FBQyxHQUFoQyxVQUFpQyxLQUFhO1FBQzVDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxLQUFLLENBQUM7SUFDN0MsQ0FBQztJQUVELG1CQUFDLDJDQUF5QixDQUFDLFNBQVMsQ0FBQyxHQUFyQyxVQUFzQyxLQUFhO1FBQ2pELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQzdDLEtBQUssRUFDTCxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUMxQyxDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFDLDRDQUEwQixDQUFDLFNBQVMsQ0FBQyxHQUF0QyxVQUF1QyxLQUFhO1FBQ2xELElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxVQUFVLENBQzdDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQ3hDLEtBQUssQ0FDTixDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFDLHFDQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUEvQixVQUFnQyxLQUFZO1FBQzFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQztJQUN4RCxDQUFDO0lBRUQsbUJBQUMsdUNBQXFCLENBQUMsU0FBUyxDQUFDLEdBQWpDLFVBQWtDLEtBQWE7UUFDN0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsYUFBYSxHQUFHLEtBQUssQ0FBQztJQUM5QyxDQUFDO0lBQ0gsZUFBQztBQUFELENBQUMsQUEzREQsQ0FBOEIsZ0NBQWMsR0EyRDNDO0FBM0RZLDRCQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29sb3IgfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9jb2xvclwiO1xyXG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xyXG5pbXBvcnQge1xyXG4gIENhcmRWaWV3Q29tbW9uLFxyXG4gIGJhY2tncm91bmRDb2xvclByb3BlcnR5LFxyXG4gIGJhY2tncm91bmRJbnRlcm5hbFByb3BlcnR5LFxyXG4gIHJhZGl1c1Byb3BlcnR5LFxyXG4gIHNoYWRvd0NvbG9yUHJvcGVydHksXHJcbiAgc2hhZG93T2Zmc2V0SGVpZ2h0UHJvcGVydHksXHJcbiAgc2hhZG93T2Zmc2V0V2lkdGhQcm9wZXJ0eSxcclxuICBzaGFkb3dPcGFjaXR5UHJvcGVydHksXHJcbiAgc2hhZG93UmFkaXVzUHJvcGVydHlcclxufSBmcm9tIFwiLi9jYXJkdmlldy1jb21tb25cIjtcclxuXHJcbmRlY2xhcmUgdmFyIFVJVmlldzogYW55LCBDR1JlY3RNYWtlOiBhbnksIENHU2l6ZU1ha2U6IGFueTtcclxuXHJcbmV4cG9ydCBjbGFzcyBDYXJkVmlldyBleHRlbmRzIENhcmRWaWV3Q29tbW9uIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHN1cGVyKCk7XHJcbiAgICBsZXQgd2lkdGggPSBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMgLSAyMDtcclxuICAgIHRoaXMubmF0aXZlVmlldyA9IG5ldyBVSVZpZXcoQ0dSZWN0TWFrZSgxMCwgMzAsIHdpZHRoLCAwKSk7XHJcbiAgICB0aGlzLm5hdGl2ZVZpZXcubGF5ZXIubWFza3NUb0JvdW5kcyA9IGZhbHNlO1xyXG4gICAgdGhpcy5zaGFkb3dDb2xvciA9IFwiYmxhY2tcIjtcclxuICAgIHRoaXMucmFkaXVzID0gMTtcclxuICAgIHRoaXMuc2hhZG93UmFkaXVzID0gMTtcclxuICAgIHRoaXMuc2hhZG93T3BhY2l0eSA9IDAuNDtcclxuICAgIHRoaXMuc2hhZG93T2Zmc2V0SGVpZ2h0ID0gMjtcclxuICAgIHRoaXMuc2hhZG93T2Zmc2V0V2lkdGggPSAwO1xyXG4gIH1cclxuXHJcbiAgZ2V0IGlvcygpOiBhbnkge1xyXG4gICAgcmV0dXJuIHRoaXMubmF0aXZlVmlldztcclxuICB9XHJcblxyXG4gIFtyYWRpdXNQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMubmF0aXZlVmlldy5sYXllci5jb3JuZXJSYWRpdXMgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIFtyYWRpdXNQcm9wZXJ0eS5nZXREZWZhdWx0XSgpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMubmF0aXZlVmlldy5sYXllci5jb3JuZXJSYWRpdXM7XHJcbiAgfVxyXG5cclxuICBbYmFja2dyb3VuZENvbG9yUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogQ29sb3IpIHtcclxuICAgIHRoaXMubmF0aXZlVmlldy5iYWNrZ3JvdW5kQ29sb3IgPSB2YWx1ZS5pb3M7XHJcbiAgfVxyXG5cclxuICBbYmFja2dyb3VuZEludGVybmFsUHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZSkge1xyXG4gICAgdGhpcy5uYXRpdmVWaWV3LmJhY2tncm91bmRDb2xvciA9IG5ldyBDb2xvcih2YWx1ZS5jb2xvciArIFwiXCIpLmlvcztcclxuICB9XHJcblxyXG4gIFtzaGFkb3dSYWRpdXNQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMubmF0aXZlVmlldy5sYXllci5zaGFkb3dSYWRpdXMgPSB2YWx1ZTtcclxuICB9XHJcblxyXG4gIFtzaGFkb3dPZmZzZXRXaWR0aFByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IG51bWJlcikge1xyXG4gICAgdGhpcy5uYXRpdmVWaWV3LmxheWVyLnNoYWRvd09mZnNldCA9IENHU2l6ZU1ha2UoXHJcbiAgICAgIHZhbHVlLFxyXG4gICAgICB0aGlzLm5hdGl2ZVZpZXcubGF5ZXIuc2hhZG93T2Zmc2V0LmhlaWdodFxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIFtzaGFkb3dPZmZzZXRIZWlnaHRQcm9wZXJ0eS5zZXROYXRpdmVdKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIHRoaXMubmF0aXZlVmlldy5sYXllci5zaGFkb3dPZmZzZXQgPSBDR1NpemVNYWtlKFxyXG4gICAgICB0aGlzLm5hdGl2ZVZpZXcubGF5ZXIuc2hhZG93T2Zmc2V0LndpZHRoLFxyXG4gICAgICB2YWx1ZVxyXG4gICAgKTtcclxuICB9XHJcblxyXG4gIFtzaGFkb3dDb2xvclByb3BlcnR5LnNldE5hdGl2ZV0odmFsdWU6IENvbG9yKSB7XHJcbiAgICB0aGlzLm5hdGl2ZVZpZXcubGF5ZXIuc2hhZG93Q29sb3IgPSB2YWx1ZS5pb3MuQ0dDb2xvcjtcclxuICB9XHJcblxyXG4gIFtzaGFkb3dPcGFjaXR5UHJvcGVydHkuc2V0TmF0aXZlXSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB0aGlzLm5hdGl2ZVZpZXcubGF5ZXIuc2hhZG93T3BhY2l0eSA9IHZhbHVlO1xyXG4gIH1cclxufVxyXG4iXX0=