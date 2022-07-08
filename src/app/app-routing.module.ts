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
import { ShoppingCartComponent } from './customer/shopping-cart/shopping-cart.component';
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
import { MasterPincodeComponent } from './Master/master-pincode/master-pincode.component';
import { HubRouteComponent } from './Admin/hub-route/hub-route.component';
import { MasterTransportComponent } from './Master/master-transport/master-transport.component';
import { MasterCountryComponent } from './Master/master-country/master-country.component';
import { MasterStateComponent } from './Master/master-state/master-state.component';
import { MasterCityComponent } from './Master/master-city/master-city.component';
import { ConsignmentComponent } from './Vendor/consignment/consignment.component';
import { ItemHandoverComponent } from './Vendor/item-handover/item-handover.component';
import { ItemHandoverListComponent } from './Vendor/item-handover-list/item-handover-list.component';



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
 {path:'create_delivery_executive',component:DeliverLoginCreationComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'hub_route',component:HubRouteComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
 {path:'master_transport',component:MasterTransportComponent,canActivate: [AuthGuard],data: {role: 'SuperAdmin'}},
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
 
// Customer

{path:'landingcategory',component:LandingCategoryComponent},
{path:'productcategory/:addcatid',component:ProductCategoryComponent},
{path:'home/itemdetails1/:itemid', component:LandingItemDetailsComponent},
{path:'home/itemdetails/:itemid', component:LandingItemDetailsComponent},
{path: 'search-result/:search', component: SearchresultComponent},
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
 {path:'accept_delivery', component:AcceptDeliveryComponent,canActivate: [AuthGuard],data: {role: 'Delivery'}},

// Master
{path:'test',component:TestComponent},
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
