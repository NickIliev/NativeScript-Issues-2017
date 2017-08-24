"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ItemsComponent = (function () {
    function ItemsComponent() {
    }
    return ItemsComponent;
}());
ItemsComponent = __decorate([
    core_1.Component({
        selector: "my-app",
        template: "\n    <ActionBar title=\"My App\"></ActionBar>\n\n\n    <StackLayout>\n\n        <Label text=\"Stacklayout\"></Label>\n        <FrescoDrawee #drawee imageUri=\"~/images/apple.png\"></FrescoDrawee>\n\n        <Label text=\"GridLayout\"></Label>\n        <GridLayout rows=\"100\">\n            <FrescoDrawee row=\"0\" #drawee imageUri=\"~/images/apple.png\"></FrescoDrawee>\n        </GridLayout>\n\n        <Label text=\"width:'50\"></Label>\n        <FrescoDrawee #drawee width=\"50\" imageUri=\"~/images/apple.png\"></FrescoDrawee>\n\n        <Label text=\"height: 50\"></Label>\n        <FrescoDrawee #drawee height=\"50\" imageUri=\"~/images/apple.png\"></FrescoDrawee>\n\n        <Label text=\"width: 50 height: 25\"></Label>\n        <FrescoDrawee #drawee width=\"50\" height=\"25\" imageUri=\"~/images/apple.png\"></FrescoDrawee>\n\n    <Label text=\"GridLayout with actualImageScaleType\"></Label>\n    <GridLayout rows=\"100\">\n        <FrescoDrawee row=\"0\" actualImageScaleType=\"center\"  #drawee imageUri=\"~/images/apple.png\"></FrescoDrawee>\n    </GridLayout>\n\n        \n    </StackLayout>\n\n  "
    })
], ItemsComponent);
exports.ItemsComponent = ItemsComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbXMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXRlbXMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQTBDO0FBcUMxQyxJQUFhLGNBQWM7SUFBM0I7SUFDQSxDQUFDO0lBQUQscUJBQUM7QUFBRCxDQUFDLEFBREQsSUFDQztBQURZLGNBQWM7SUFuQzFCLGdCQUFTLENBQUM7UUFDUCxRQUFRLEVBQUUsUUFBUTtRQUNsQixRQUFRLEVBQUUsNGxDQStCWDtLQUNGLENBQUM7R0FDVyxjQUFjLENBQzFCO0FBRFksd0NBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogXCJteS1hcHBcIixcbiAgICB0ZW1wbGF0ZTogYFxuICAgIDxBY3Rpb25CYXIgdGl0bGU9XCJNeSBBcHBcIj48L0FjdGlvbkJhcj5cblxuXG4gICAgPFN0YWNrTGF5b3V0PlxuXG4gICAgICAgIDxMYWJlbCB0ZXh0PVwiU3RhY2tsYXlvdXRcIj48L0xhYmVsPlxuICAgICAgICA8RnJlc2NvRHJhd2VlICNkcmF3ZWUgaW1hZ2VVcmk9XCJ+L2ltYWdlcy9hcHBsZS5wbmdcIj48L0ZyZXNjb0RyYXdlZT5cblxuICAgICAgICA8TGFiZWwgdGV4dD1cIkdyaWRMYXlvdXRcIj48L0xhYmVsPlxuICAgICAgICA8R3JpZExheW91dCByb3dzPVwiMTAwXCI+XG4gICAgICAgICAgICA8RnJlc2NvRHJhd2VlIHJvdz1cIjBcIiAjZHJhd2VlIGltYWdlVXJpPVwifi9pbWFnZXMvYXBwbGUucG5nXCI+PC9GcmVzY29EcmF3ZWU+XG4gICAgICAgIDwvR3JpZExheW91dD5cblxuICAgICAgICA8TGFiZWwgdGV4dD1cIndpZHRoOic1MFwiPjwvTGFiZWw+XG4gICAgICAgIDxGcmVzY29EcmF3ZWUgI2RyYXdlZSB3aWR0aD1cIjUwXCIgaW1hZ2VVcmk9XCJ+L2ltYWdlcy9hcHBsZS5wbmdcIj48L0ZyZXNjb0RyYXdlZT5cblxuICAgICAgICA8TGFiZWwgdGV4dD1cImhlaWdodDogNTBcIj48L0xhYmVsPlxuICAgICAgICA8RnJlc2NvRHJhd2VlICNkcmF3ZWUgaGVpZ2h0PVwiNTBcIiBpbWFnZVVyaT1cIn4vaW1hZ2VzL2FwcGxlLnBuZ1wiPjwvRnJlc2NvRHJhd2VlPlxuXG4gICAgICAgIDxMYWJlbCB0ZXh0PVwid2lkdGg6IDUwIGhlaWdodDogMjVcIj48L0xhYmVsPlxuICAgICAgICA8RnJlc2NvRHJhd2VlICNkcmF3ZWUgd2lkdGg9XCI1MFwiIGhlaWdodD1cIjI1XCIgaW1hZ2VVcmk9XCJ+L2ltYWdlcy9hcHBsZS5wbmdcIj48L0ZyZXNjb0RyYXdlZT5cblxuICAgIDxMYWJlbCB0ZXh0PVwiR3JpZExheW91dCB3aXRoIGFjdHVhbEltYWdlU2NhbGVUeXBlXCI+PC9MYWJlbD5cbiAgICA8R3JpZExheW91dCByb3dzPVwiMTAwXCI+XG4gICAgICAgIDxGcmVzY29EcmF3ZWUgcm93PVwiMFwiIGFjdHVhbEltYWdlU2NhbGVUeXBlPVwiY2VudGVyXCIgICNkcmF3ZWUgaW1hZ2VVcmk9XCJ+L2ltYWdlcy9hcHBsZS5wbmdcIj48L0ZyZXNjb0RyYXdlZT5cbiAgICA8L0dyaWRMYXlvdXQ+XG5cbiAgICAgICAgXG4gICAgPC9TdGFja0xheW91dD5cblxuICBgXG59KVxuZXhwb3J0IGNsYXNzIEl0ZW1zQ29tcG9uZW50ICB7XG59XG4iXX0=