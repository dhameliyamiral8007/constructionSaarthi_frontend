import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import roleReducer from "./slice/RolesPermission/RolesSlice";
import featureReducer from "./slice/RolesPermission/FeatureSlice";
import permissionReducer from "./slice/RolesPermission/PermissionSlice";
import gavgeReducer from "./slice/Types/GavgeTypeSlice";
import mediaReducer from "./slice/Types/MediaSlice";
import inventoryReducer from "./slice/Types/inventorySlice";
import couponReducer from "./slice/Types/couponSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    feature: featureReducer,
    permission: permissionReducer,
    gavge: gavgeReducer,
    media: mediaReducer,
    inventory: inventoryReducer,
    coupon: couponReducer,
  },
});
