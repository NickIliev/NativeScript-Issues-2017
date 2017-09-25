"use strict";
// 4.1.4 Reflect.hasMetadata ( metadataKey, target [, propertyKey] )
// https://rbuckton.github.io/reflect-metadata/#reflect.hasmetadata
Object.defineProperty(exports, "__esModule", { value: true });
require("../Reflect");
var chai_1 = require("chai");
describe("Reflect.hasMetadata", function () {
    it("InvalidTarget", function () {
        chai_1.assert.throws(function () { return Reflect.hasMetadata("key", undefined, undefined); }, TypeError);
    });
    it("WithoutTargetKeyWhenNotDefined", function () {
        var obj = {};
        var result = Reflect.hasMetadata("key", obj, undefined);
        chai_1.assert.equal(result, false);
    });
    it("WithoutTargetKeyWhenDefined", function () {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, undefined);
        var result = Reflect.hasMetadata("key", obj, undefined);
        chai_1.assert.equal(result, true);
    });
    it("WithoutTargetKeyWhenDefinedOnPrototype", function () {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, undefined);
        var result = Reflect.hasMetadata("key", obj, undefined);
        chai_1.assert.equal(result, true);
    });
    it("WithTargetKeyWhenNotDefined", function () {
        var obj = {};
        var result = Reflect.hasMetadata("key", obj, "name");
        chai_1.assert.equal(result, false);
    });
    it("WithTargetKeyWhenDefined", function () {
        var obj = {};
        Reflect.defineMetadata("key", "value", obj, "name");
        var result = Reflect.hasMetadata("key", obj, "name");
        chai_1.assert.equal(result, true);
    });
    it("WithTargetKeyWhenDefinedOnPrototype", function () {
        var prototype = {};
        var obj = Object.create(prototype);
        Reflect.defineMetadata("key", "value", prototype, "name");
        var result = Reflect.hasMetadata("key", obj, "name");
        chai_1.assert.equal(result, true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVmbGVjdC1oYXNtZXRhZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlZmxlY3QtaGFzbWV0YWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9FQUFvRTtBQUNwRSxtRUFBbUU7O0FBRW5FLHNCQUFvQjtBQUNwQiw2QkFBOEI7QUFFOUIsUUFBUSxDQUFDLHFCQUFxQixFQUFFO0lBQzVCLEVBQUUsQ0FBQyxlQUFlLEVBQUU7UUFDaEIsYUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUFNLE9BQUEsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFoRCxDQUFnRCxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3JGLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGdDQUFnQyxFQUFFO1FBQ2pDLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxhQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUM5QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxhQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyx3Q0FBd0MsRUFBRTtRQUN6QyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUM7UUFDbkIsSUFBSSxHQUFHLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuQyxPQUFPLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzdELElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN4RCxhQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyw2QkFBNkIsRUFBRTtRQUM5QixJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsYUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsMEJBQTBCLEVBQUU7UUFDM0IsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2IsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUNwRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsYUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDdEMsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBQ25CLElBQUksR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbkMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDckQsYUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8vIDQuMS40IFJlZmxlY3QuaGFzTWV0YWRhdGEgKCBtZXRhZGF0YUtleSwgdGFyZ2V0IFssIHByb3BlcnR5S2V5XSApXHJcbi8vIGh0dHBzOi8vcmJ1Y2t0b24uZ2l0aHViLmlvL3JlZmxlY3QtbWV0YWRhdGEvI3JlZmxlY3QuaGFzbWV0YWRhdGFcclxuXHJcbmltcG9ydCBcIi4uL1JlZmxlY3RcIjtcclxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSBcImNoYWlcIjtcclxuXHJcbmRlc2NyaWJlKFwiUmVmbGVjdC5oYXNNZXRhZGF0YVwiLCAoKSA9PiB7XHJcbiAgICBpdChcIkludmFsaWRUYXJnZXRcIiwgKCkgPT4ge1xyXG4gICAgICAgIGFzc2VydC50aHJvd3MoKCkgPT4gUmVmbGVjdC5oYXNNZXRhZGF0YShcImtleVwiLCB1bmRlZmluZWQsIHVuZGVmaW5lZCksIFR5cGVFcnJvcik7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcIldpdGhvdXRUYXJnZXRLZXlXaGVuTm90RGVmaW5lZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgdW5kZWZpbmVkKTtcclxuICAgICAgICBhc3NlcnQuZXF1YWwocmVzdWx0LCBmYWxzZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcIldpdGhvdXRUYXJnZXRLZXlXaGVuRGVmaW5lZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIFJlZmxlY3QuZGVmaW5lTWV0YWRhdGEoXCJrZXlcIiwgXCJ2YWx1ZVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IFJlZmxlY3QuaGFzTWV0YWRhdGEoXCJrZXlcIiwgb2JqLCB1bmRlZmluZWQpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJXaXRob3V0VGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgdW5kZWZpbmVkKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gUmVmbGVjdC5oYXNNZXRhZGF0YShcImtleVwiLCBvYmosIHVuZGVmaW5lZCk7XHJcbiAgICAgICAgYXNzZXJ0LmVxdWFsKHJlc3VsdCwgdHJ1ZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpdChcIldpdGhUYXJnZXRLZXlXaGVuTm90RGVmaW5lZFwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IG9iaiA9IHt9O1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIGZhbHNlKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGl0KFwiV2l0aFRhcmdldEtleVdoZW5EZWZpbmVkXCIsICgpID0+IHtcclxuICAgICAgICBsZXQgb2JqID0ge307XHJcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaXQoXCJXaXRoVGFyZ2V0S2V5V2hlbkRlZmluZWRPblByb3RvdHlwZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgbGV0IHByb3RvdHlwZSA9IHt9O1xyXG4gICAgICAgIGxldCBvYmogPSBPYmplY3QuY3JlYXRlKHByb3RvdHlwZSk7XHJcbiAgICAgICAgUmVmbGVjdC5kZWZpbmVNZXRhZGF0YShcImtleVwiLCBcInZhbHVlXCIsIHByb3RvdHlwZSwgXCJuYW1lXCIpO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBSZWZsZWN0Lmhhc01ldGFkYXRhKFwia2V5XCIsIG9iaiwgXCJuYW1lXCIpO1xyXG4gICAgICAgIGFzc2VydC5lcXVhbChyZXN1bHQsIHRydWUpO1xyXG4gICAgfSk7XHJcbn0pOyJdfQ==