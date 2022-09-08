import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductSpecificationComponent } from './Admin/add-product-specification/add-product-specification.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ContactComponent } from './Admin/contact/contact.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { ItemSpecificationForVendorComponent } from './Admin/item-specification-for-vendor/item-specification-for-vendor.component';
import { ProductFeaturesComponent } from './Admin/product-features/product-features.component';
import { ProductListComponent } from './Admin/product-list/product-list.component';
import { ProductVariantComponent } from './Admin/product-variant/product-variant.component';
import { VerifyItemListComponent } from './Admin/verify-item-list/verify-item-list.component';
import { VerifyItemComponent } from './Admin/verify-item/verify-item.component';
import { HeaderComponent } from './component/header/header.component';
import { PublicLandingComponent } from './component/public-landing/public-landing.component';
import { CartCheckOutAddressComponent } from './customer/cart-check-out-address/cart-check-out-address.component';
import { CartCheckOutPaymentComponent } from './customer/cart-check-out-payment/cart-check-out-payment.component';
import { CartCheckOutPlaceorderComponent } from './customer/cart-check-out-placeorder/cart-check-out-placeorder.component';
import { CustomerOrderTrackComponent } from './customer/customer-order-track/customer-order-track.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerorderhistoryComponent } from './customer/customerorderhistory/customerorderhistory.component';
import { LandingCategoryComponent } from './customer/landing-category/landing-category.component';
import { LandingItemDetailsComponent } from './customer/landing-item-details/landing-item-details.component';
import { LandingComponent } from './customer/landing/landing.component';
import { OrderConfirmComponent } from './customer/order-confirm/order-confirm.component';
import { OrderItemDetailsComponent } from './customer/order-item-details/order-item-details.component';
import { ProductCategoryComponent } from './customer/product-category/product-category.component';

import { DocumentverificationComponent } from './Admin/documentverification/documentverification.component';
import { AppHomeComponent } from './home/app-home/app-home.component';

import { CategorySpecificationMapComponent } from './Master/category-specification-map/category-specification-map.component';
import { CategoryVariantMapComponent } from './Master/category-variant-map/category-variant-map.component';
import { ContentmanagementComponent } from './Master/contentmanagement/contentmanagement.component';
import { Error404Component } from './Master/error404/error404.component';
import { ItemSpecificationMapComponent } from './Master/item-specification-map/item-specification-map.component';
import { MasterAdditionalCategoryComponent } from './Master/master-additional-category/master-additional-category.component';
import { MasterAttributeNameComponent } from './Master/master-attribute-name/master-attribute-name.component';
import { MasterAttributeValueComponent } from './Master/master-attribute-value/master-attribute-value.component';
import { MasterCategoryComponent } from './Master/master-category/master-category.component';
import { MasterSpecificationComponent } from './Master/master-specification/master-specification.component';
import { MasterSubcategoryComponent } from './Master/master-subcategory/master-subcategory.component';
import { ProductSpecificationMapComponent } from './Master/product-specification-map/product-specification-map.component';
import { SpecificationAttributenameMapComponent } from './Master/specification-attributename-map/specification-attributename-map.component';
import { AuthGuard } from './service/authGuard/auth.guard';
import { AddItemSpecificationComponent } from './Vendor/add-item-specification/add-item-specification.component';
import { AdditemComponent } from './Vendor/additem/additem.component';
import { EditItemComponent } from './Vendor/edit-item/edit-item.component';
import { ItemListComponent } from './Vendor/item-list/item-list.component';
import { ItemfeaturesComponent } from './Vendor/itemfeatures/itemfeatures.component';
import { VendorDashboardComponent } from './Vendor/vendor-dashboard/vendor-dashboard.component';
import { VendorOrderListComponent } from './Vendor/vendor-order-list/vendor-order-list.component';
import { VendorDocumentComponent } from './Vendor/vendor-document/vendor-document.component';
import { VendorprofileComponent } from './Vendor/vendorprofile/vendorprofile.component';
import { ManagestoreComponent } from './Vendor/managestore/managestore.component';
import { VendorBankDetailsComponent } from './Vendor/vendor-bank-details/vendor-bank-details.component';
import { TestComponent } from './Master/test/test.component';
import { ManagegallaryComponent } from './managegallary/managegallary.component';
import { CancelOrderRequestComponent } from './Vendor/cancel-order-request/cancel-order-request.component';
import { SearchresultComponent } from './customer/searchresult/searchresult.component';
import { ReturnOrderRequestComponent } from './Vendor/return-order-request/return-order-request.component';
import { CancelOrderVerifyComponent } from './Admin/cancel-order-verify/cancel-order-verify.component';
import { ReturnOrderVerifyComponent } from './Admin/return-order-verify/return-order-verify.component';
import { DirectCartComponent } from './customer/direct-cart/direct-cart.component';
import { DirectCartAddressComponent } from './customer/direct-cart-address/direct-cart-address.component';
import { DirectCartSelectPaymentComponent } from './customer/direct-cart-select-payment/direct-cart-select-payment.component';
import { DirectCartPlaceOrderComponent } from './customer/direct-cart-place-order/direct-cart-place-order.component';
import { DirectCartOrderConfirmComponent } from './customer/direct-cart-order-confirm/direct-cart-order-confirm.component';
import { OrderwisePaymentListComponent } from './customer/orderwise-payment-list/orderwise-payment-list.component';
import { VendorListComponent } from './Admin/Reports/vendor-list/vendor-list.component';
import { CustomerListComponent } from './Admin/Reports/customer-list/customer-list.component';
import { ShowAllItemListComponent } from './Admin/Reports/show-all-item-list/show-all-item-list.component';
import { AcceptDeliveryComponent } from './Delivery/accept-delivery/accept-delivery.component';
import { DeliverLoginCreationComponent } from './Admin/deliver-login-creation/deliver-login-creation.component';
import { PublicCartComponent } from './customer/cart_without_login/public-cart/public-cart.component';
import { PublicDirectCartComponent } from './customer/cart_without_login/public-direct-cart/public-direct-cart.component';
import { VendorReassignComponent } from './Vendor/vendor-reassign/vendor-reassign.component';
import { DashboardComponent } from './logistics/dashboard/dashboard.component';
import { HubprofileComponent } from './logistics/hubprofile/hubprofile.component';
import { MasterPincodeComponent } from './Master/master-pincode/master-pincode.component';
import { HubRouteComponent } from './Admin/hub-route/hub-route.component';
import { VendortohubComponent } from './logistics/vendortohub/vendortohub.component';
import { MasterTransportComponent } from './Master/master-transport/master-transport.component';
import { MasterCountryComponent } from './Master/master-country/master-country.component';
import { MasterStateComponent } from './Master/master-state/master-state.component';
import { MasterCityComponent } from './Master/master-city/master-city.component';
import { ConsignmentComponent } from './Vendor/consignment/consignment.component';
import { ItemHandoverComponent } from './Vendor/item-handover/item-handover.component';
import { ItemHandoverListComponent } from './Vendor/item-handover-list/item-handover-list.component';
import { ManagefacilitationcenterComponent } from './logistics/managefacilitationcenter/managefacilitationcenter.component';

import { TestPageComponent } from './Master/test-page/test-page.component';
import { HubConsignmentListComponent } from './HubManager/hub-consignment-list/hub-consignment-list.component';

import { HubShippingListComponent } from './HubManager/hub-shipping-list/hub-shipping-list.component';
import { HubShippedComponent } from './HubManager/hub-shipped/hub-shipped.component';
import { HubArrivedDestinationComponent } from './HubManager/hub-arrived-destination/hub-arrived-destination.component';

import { AssignItemFromVendorComponent } from './Facilitation/assign-item-from-vendor/assign-item-from-vendor.component';
import { FcConsignmentListComponent } from './Facilitation/fc-consignment-list/fc-consignment-list.component';
import { NewOrderListComponent } from './Vendor/new-order-list/new-order-list.component';
import { FcFacilitationToCustomerComponent } from './Facilitation/fc-facilitation-to-customer/fc-facilitation-to-customer.component';
import { FcFacilitationToHubComponent } from './Facilitation/fc-facilitation-to-hub/fc-facilitation-to-hub.component';
import { DeliveryToCustomerComponent } from './Delivery/delivery-to-customer/delivery-to-customer.component';

import { HubtofacilitationcenterComponent } from './HubManager/hubtofacilitationcenter/hubtofacilitationcenter.component';
import { FacilitationcenterRouteComponent } from './HubManager/facilitationcenter-route/facilitationcenter-route.component';

import { VendorVerifyComponent } from './Admin/vendor-verify/vendor-verify.component';
import { CreateHubVehicleComponent } from './HubManager/create-hub-vehicle/create-hub-vehicle.component';
import { MasterVehicleTypeComponent } from './Master/master-vehicle-type/master-vehicle-type.component';
import { AssignedBatchListComponent } from './HubManager/assigned-batch-list/assigned-batch-list.component';
import { FcHubOrHubFcAssignComponent } from './HubManager/fc-hub-or-hub-fc-assign/fc-hub-or-hub-fc-assign.component';
import { FcToHubDeliveryComponent } from './Delivery/fc-to-hub-delivery/fc-to-hub-delivery.component';
import { HubToFcDeliveryComponent } from './Delivery/hub-to-fc-delivery/hub-to-fc-delivery.component';
import { MasterFacilitationComponent } from './Master/master-facilitation/master-facilitation.component';
import { MapFacilitationPincodeComponent } from './Master/map-facilitation-pincode/map-facilitation-pincode.component';
import { HubToHubAssignComponent } from './HubManager/hub-to-hub-assign/hub-to-hub-assign.component';
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
import { AddMultipleimageComponent } from './Vendor/add-multipleimage/add-multipleimage.component';
import { HubManagerListComponent } from './Admin/hub-manager-list/hub-manager-list.component';
import { FacilitationManagerListComponent } from './Admin/facilitation-manager-list/facilitation-manager-list.component';
import { SendHubToHubComponent } from './Delivery/send-hub-to-hub/send-hub-to-hub.component';
import { ReceiveHubToHubComponent } from './Delivery/receive-hub-to-hub/receive-hub-to-hub.component';
import { HubManagerLoginCreationComponent } from './Admin/hub-manager-login-creation/hub-manager-login-creation.component';
import { CreateFacilitationComponent } from './Admin/create-facilitation/create-facilitation.component';
import { FacilitationConsignmentComponent } from './Facilitation/facilitation-consignment/facilitation-consignment.component';





const routes: Routes = [

  { path: '', pathMatch: 'full', redirectTo: 'app/home' },
  { path: 'app',component:AppHomeComponent,
  //canActivate: [AuthGuard],
  children: [
  {path:'home',component:LandingComponent},
  {path:'contact',component:ContactComponent},
  //{path: 'search-result/:search', component: SearchresultComponent},

// Super Admin
 {path:'admindashboard',component:AdminDashboardComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'addproduct', component:AddProductComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'addproductspecification/:productid', component:AddProductSpecificationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'productquestionset/:productid', component:ItemSpecificationForVendorComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'productfeatures/:productid',component:ProductFeaturesComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'productvariant/:productid',component:ProductVariantComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},

 {path:'editproduct/:productid',component:EditProductComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'productlist', component:ProductListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'verifyitemlist', component:VerifyItemListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'verifyitem/:itemid', component:VerifyItemComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'documentverification',component:DocumentverificationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'cancelorder_verify',component:CancelOrderVerifyComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'returnorder_verify',component:ReturnOrderVerifyComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'orderwise_payment_list',component:OrderwisePaymentListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'vendor_list',component:VendorListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'customer_list',component:CustomerListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'item_list',component:ShowAllItemListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},

 {path:'hub_route',component:HubRouteComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'master_transport',component:MasterTransportComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'logistics/dashboard',component:DashboardComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'logistics/Managehub',component:HubprofileComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'logistics/Vendortohub',component:VendortohubComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'logistics/Managefacilitationcenter/:hub_id',component:ManagefacilitationcenterComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'hub_manager_login',component:HubManagerLoginCreationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'create_falilitation_login',component:CreateFacilitationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'verify_vendor',component:VendorVerifyComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'master_vehicle_type',component:MasterVehicleTypeComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'hub_manager_list',component:HubManagerListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'facilitation_manager_list',component:FacilitationManagerListComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},


 // Vendor
 {path:'vendordashboard', component:VendorDashboardComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'additemspecification/:itemid', component:AddItemSpecificationComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'additemfeature/:itemid', component:ItemfeaturesComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'additem', component:AdditemComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'edititem/:itemid', component:EditItemComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'vendororderlist', component:VendorOrderListComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'itemlist', component:ItemListComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'vendorprofile', component:VendorprofileComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'vendordocuments',component:VendorDocumentComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'managestore',component:ManagestoreComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'vendorbank_details',component:VendorBankDetailsComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'cancelorder_request',component:CancelOrderRequestComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'returnorder_request',component:ReturnOrderRequestComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'vendor_reassign',component:VendorReassignComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'consignment',component:ConsignmentComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'item_handover',component:ItemHandoverComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'item_handover_list',component:ItemHandoverListComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'new_order_list',component:NewOrderListComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},
 {path:'add_image/:itemid',component:AddMultipleimageComponent,canActivate: [AuthGuard],data: {role: 'Vendor'}},

// Customer

{path:'landingcategory',component:LandingCategoryComponent},
{path:'productcategory/:addcatid',component:ProductCategoryComponent},
{path:'home/itemdetails1/:itemid', component:LandingItemDetailsComponent},
{path:'home/itemdetails/:itemid', component:LandingItemDetailsComponent},
{path:'search-result/:search', component: SearchresultComponent},
 {path:'cart',component:ShoppingCartComponent},
 {path:'cart/address',component:CartCheckOutAddressComponent},
 {path:'cart/payment',component:CartCheckOutPaymentComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'cart/placeorder',component:CartCheckOutPlaceorderComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'cart/orderconfirm',component:OrderConfirmComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'orderhistory',component:CustomerorderhistoryComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'customerprofile', component:CustomerProfileComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'orderhistory',component:CustomerorderhistoryComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'orderhistory/customerordertrack', component:CustomerOrderTrackComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'orderhistory/customerordertrack/orderitemdetails', component:OrderItemDetailsComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'direct_cart', component:DirectCartComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'direct_cart_address', component:DirectCartAddressComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'direct_cart_payment', component:DirectCartSelectPaymentComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'direct_cart_placeorder', component:DirectCartPlaceOrderComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'direct_cart_orderconfirm', component:DirectCartOrderConfirmComponent,canActivate: [AuthGuard],data: {role: 'Customer'}},
 {path:'public_cart', component:PublicCartComponent},
 {path:'public_direct_cart', component:PublicDirectCartComponent},

 // Delivery
 {path:'vendor_to_facilitation', component:AcceptDeliveryComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},
 {path:'deliver_to_customer', component:DeliveryToCustomerComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},
  {path:'fc_to_hub_delivery', component:FcToHubDeliveryComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},
  {path:'hub_to_fc_delivery', component:HubToFcDeliveryComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},
  {path:'send_hub_to_hub', component:SendHubToHubComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},
  {path:'receive_hub_to_hub', component:ReceiveHubToHubComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},

  // Hub Manager
  {path:'hub_consignment_list', component:HubConsignmentListComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},

  {path:'hub_shipping_list', component:HubShippingListComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'hub_shipped', component:HubShippedComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'hub_arrived_destination', component:HubArrivedDestinationComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'create_delivery_executive',component:DeliverLoginCreationComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},

  {path:'hubtofacilitationcenter', component:HubtofacilitationcenterComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'facilitationcenter_route', component:FacilitationcenterRouteComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'assignedbatchlist', component:AssignedBatchListComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'create_hub_vehicle', component:CreateHubVehicleComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'fc_hub_or_hub_fc', component:FcHubOrHubFcAssignComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},
  {path:'hub_to_hub', component:HubToHubAssignComponent,canActivate: [AuthGuard],data: {role: 'HubManager'}},



// Facilitation
{path:'assign_item_from_vendor',component:AssignItemFromVendorComponent,canActivate: [AuthGuard],data: {role: 'FacilitationCenter'}},
{path:'fc_consignment_list',component:FcConsignmentListComponent,canActivate: [AuthGuard],data: {role: 'FacilitationCenter'}},
{path:'fc_facilitation_to_customer',component:FcFacilitationToCustomerComponent,canActivate: [AuthGuard],data: {role: 'FacilitationCenter'}},
{path:'fc_facilitation_to_hub',component:FcFacilitationToHubComponent,canActivate: [AuthGuard],data: {role: 'FacilitationCenter'}},
{path:'facilitation_consignment',component:FacilitationConsignmentComponent,canActivate: [AuthGuard],data: {role: 'FacilitationCenter'}},


// Master
{path:'test',component:TestComponent},
{path:'testpage',component:TestPageComponent},
{path:'masterbanner',component:ContentmanagementComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'mastercategory',component:MasterCategoryComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'subcategory',component:MasterSubcategoryComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'additionalcategory',component:MasterAdditionalCategoryComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_specification',component:MasterSpecificationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_attributename',component:MasterAttributeNameComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_attributevalue',component:MasterAttributeValueComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'specification_attribute',component:SpecificationAttributenameMapComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'category_specification',component:CategorySpecificationMapComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'product_specification',component:ProductSpecificationMapComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'item_specification', component:ItemSpecificationMapComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'category_variant', component:CategoryVariantMapComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'Managegallary',component:ManagegallaryComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_pincode',component:MasterPincodeComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_country',component:MasterCountryComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_state',component:MasterStateComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_city',component:MasterCityComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'master_facilitation',component:MasterFacilitationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
{path:'map_facilitation_pincode',component:MapFacilitationPincodeComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},




 {path: '**', pathMatch: 'full',component:Error404Component},

 ],
},




  { path: '**', pathMatch: 'full',component:LandingComponent},
];



@NgModule({
 imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
 exports: [RouterModule]
})
export class AppRoutingModule { }
