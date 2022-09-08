import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule }    from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { PublicLandingComponent } from './component/public-landing/public-landing.component';
import { LandingComponent } from './customer/landing/landing.component';
import { LandingItemDetailsComponent } from './customer/landing-item-details/landing-item-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartCheckOutAddressComponent } from './customer/cart-check-out-address/cart-check-out-address.component';
import { CartCheckOutPaymentComponent } from './customer/cart-check-out-payment/cart-check-out-payment.component';
import { CartCheckOutPlaceorderComponent } from './customer/cart-check-out-placeorder/cart-check-out-placeorder.component';
import { OrderConfirmComponent } from './customer/order-confirm/order-confirm.component';
import { AdditemComponent } from './Vendor/additem/additem.component';
import { CustomerorderhistoryComponent } from './customer/customerorderhistory/customerorderhistory.component';
import { AuthService } from './service/authService/auth.service';
import { AuthGuard } from './service/authGuard/auth.guard';
import { DataService } from './dataservice/data.service';
import { ItemfeaturesComponent } from './Vendor/itemfeatures/itemfeatures.component'
import { ProductCategoryComponent } from './customer/product-category/product-category.component';
import { CustomerProfileComponent } from './customer/customer-profile/customer-profile.component';
import { CustomerOrderTrackComponent } from './customer/customer-order-track/customer-order-track.component';
import { OrderItemDetailsComponent } from './customer/order-item-details/order-item-details.component';
import { VendorDashboardComponent } from './Vendor/vendor-dashboard/vendor-dashboard.component';
import { AddProductComponent } from './Admin/add-product/add-product.component';
import { ContactComponent } from './Admin/contact/contact.component';
import { AddItemSpecificationComponent } from './Vendor/add-item-specification/add-item-specification.component';
import { AddProductSpecificationComponent } from './Admin/add-product-specification/add-product-specification.component';
import { LoginHomeComponent } from './home/login-home/login-home.component';
import { AppHomeComponent } from './home/app-home/app-home.component';
import { NgxEditorModule } from 'ngx-editor';
import { ProductFeaturesComponent} from './Admin/product-features/product-features.component';
import { MapitemspecificationComponent } from './Admin/mapitemspecification/mapitemspecification.component';

import { ItemSpecificationForVendorComponent } from './Admin/item-specification-for-vendor/item-specification-for-vendor.component';
import { Error404Component } from './Master/error404/error404.component';
import { ContentmanagementComponent } from './Master/contentmanagement/contentmanagement.component';
import { EditProductComponent } from './Admin/edit-product/edit-product.component';
import { MasterCategoryComponent } from './Master/master-category/master-category.component';
import { MasterSubcategoryComponent } from './Master/master-subcategory/master-subcategory.component';
import { MasterAdditionalCategoryComponent } from './Master/master-additional-category/master-additional-category.component';
import { ProductListComponent } from './Admin/product-list/product-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpecificationAttributenameMapComponent } from './Master/specification-attributename-map/specification-attributename-map.component';
import { MasterSpecificationComponent } from './Master/master-specification/master-specification.component';
import { MasterAttributeNameComponent } from './Master/master-attribute-name/master-attribute-name.component';
import { MasterAttributeValueComponent } from './Master/master-attribute-value/master-attribute-value.component';
import { ItemListComponent } from './Vendor/item-list/item-list.component';
import { EditItemComponent } from './Vendor/edit-item/edit-item.component';
import { LandingCategoryComponent } from './customer/landing-category/landing-category.component';
import { VendorprofileComponent } from './Vendor/vendorprofile/vendorprofile.component';
import { CategorySpecificationMapComponent } from './Master/category-specification-map/category-specification-map.component';
import { ProductSpecificationMapComponent } from './Master/product-specification-map/product-specification-map.component';
import { ItemSpecificationMapComponent } from './Master/item-specification-map/item-specification-map.component';
import { CategoryVariantMapComponent } from './Master/category-variant-map/category-variant-map.component';
import { AdminDashboardComponent } from './Admin/admin-dashboard/admin-dashboard.component';
import { ProductVariantComponent } from './Admin/product-variant/product-variant.component';
import { VendorOrderListComponent } from './Vendor/vendor-order-list/vendor-order-list.component';
import { VerifyItemComponent } from './Admin/verify-item/verify-item.component';
import { VerifyItemListComponent } from './Admin/verify-item-list/verify-item-list.component';

import { HomePageComponent } from './home/home-page/home-page.component';
import { PublicProductCategoryComponent } from './home/public-product-category/public-product-category.component';
import { DocumentverificationComponent } from './Admin/documentverification/documentverification.component';
import { VendorDocumentComponent } from './Vendor/vendor-document/vendor-document.component';
import { ManagestoreComponent } from './Vendor/managestore/managestore.component';
import { VendorBankDetailsComponent } from './Vendor/vendor-bank-details/vendor-bank-details.component';
import { TestComponent } from './Master/test/test.component';
import { ManagegallaryComponent } from './managegallary/managegallary.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxSpinnerModule } from "ngx-spinner";
// import { Guid } from guid-typescript;
import { CancelOrderRequestComponent } from './Vendor/cancel-order-request/cancel-order-request.component';
import { SearchresultComponent } from './customer/searchresult/searchresult.component';
import { CancelOrderVerifyComponent } from './Admin/cancel-order-verify/cancel-order-verify.component';
import { ReturnOrderRequestComponent } from './Vendor/return-order-request/return-order-request.component';
import { ReturnOrderVerifyComponent } from './Admin/return-order-verify/return-order-verify.component';
import { DirectCartComponent } from './customer/direct-cart/direct-cart.component';
import { DirectCartAddressComponent } from './customer/direct-cart-address/direct-cart-address.component';
import { DirectCartSelectPaymentComponent } from './customer/direct-cart-select-payment/direct-cart-select-payment.component';
import { DirectCartPlaceOrderComponent } from './customer/direct-cart-place-order/direct-cart-place-order.component';
import { DirectCartOrderConfirmComponent } from './customer/direct-cart-order-confirm/direct-cart-order-confirm.component';
import { OrderwisePaymentListComponent } from './customer/orderwise-payment-list/orderwise-payment-list.component';
import { CustomerListComponent } from './Admin/Reports/customer-list/customer-list.component';

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
//import { NgxBarcodeModule } from 'ngx-barcode';
//import { NgxBarcode6Module } from 'ngx-barcode6';
import { ItemHandoverComponent } from './Vendor/item-handover/item-handover.component';
import { ItemHandoverListComponent } from './Vendor/item-handover-list/item-handover-list.component';
import { TestPageComponent } from './Master/test-page/test-page.component';
import { NgxPrintModule } from 'ngx-print';
import { ManagefacilitationcenterComponent } from './logistics/managefacilitationcenter/managefacilitationcenter.component';
import { HubConsignmentListComponent } from './HubManager/hub-consignment-list/hub-consignment-list.component';
import { HubManagerLoginCreationComponent } from './Admin/hub-manager-login-creation/hub-manager-login-creation.component';

import { HubShippingListComponent } from './HubManager/hub-shipping-list/hub-shipping-list.component';
import { HubArrivedDestinationComponent } from './HubManager/hub-arrived-destination/hub-arrived-destination.component';
import { HubShippedComponent } from './HubManager/hub-shipped/hub-shipped.component';

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
import { PublicLandingItemDetailsComponent } from './home/public-landing-item-details/public-landing-item-details.component';
import { VendorListComponent } from './Admin/Reports/vendor-list/vendor-list.component';
import { ShowAllItemListComponent } from './Admin/Reports/show-all-item-list/show-all-item-list.component';
import { PublicLandingCategoryComponent } from './home/public-landing-category/public-landing-category.component';
import { AddMultipleimageComponent } from './Vendor/add-multipleimage/add-multipleimage.component';
import { HubManagerListComponent } from './Admin/hub-manager-list/hub-manager-list.component';
import { FacilitationManagerListComponent } from './Admin/facilitation-manager-list/facilitation-manager-list.component';
import { SendHubToHubComponent } from './Delivery/send-hub-to-hub/send-hub-to-hub.component';
import { ReceiveHubToHubComponent } from './Delivery/receive-hub-to-hub/receive-hub-to-hub.component';
import { CreateFacilitationComponent } from './Admin/create-facilitation/create-facilitation.component';
import { FacilitationConsignmentComponent } from './Facilitation/facilitation-consignment/facilitation-consignment.component';

//import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
//import{MultiSelectModule} from 'primeng/multiselect'




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PublicLandingComponent,
    LandingComponent,
    LandingItemDetailsComponent,
  ShoppingCartComponent,
    CartCheckOutAddressComponent,
    CartCheckOutPaymentComponent,
    CartCheckOutPlaceorderComponent,
    OrderConfirmComponent,
VendorOrderListComponent,
    AdditemComponent,
    CustomerorderhistoryComponent,
    ItemfeaturesComponent,
    ProductFeaturesComponent,
    CustomerorderhistoryComponent,
    ProductCategoryComponent,
    CustomerProfileComponent,
    CustomerOrderTrackComponent,
    MapitemspecificationComponent,
    OrderItemDetailsComponent,
    VendorDashboardComponent,
    AddProductComponent,
    ContactComponent,
    AddItemSpecificationComponent,
    AddProductSpecificationComponent,
     LoginHomeComponent,
    AppHomeComponent,
  PublicLandingItemDetailsComponent,
    ItemSpecificationForVendorComponent,
      Error404Component,
      ContentmanagementComponent,
      EditProductComponent,
       MasterCategoryComponent,
      MasterSubcategoryComponent,
      MasterAdditionalCategoryComponent,
      ProductListComponent,
        SpecificationAttributenameMapComponent,
      MasterSpecificationComponent,
      MasterAttributeNameComponent,
      MasterAttributeValueComponent,
      ItemListComponent,
      EditItemComponent,
      LandingCategoryComponent,
    VendorprofileComponent,
    CategorySpecificationMapComponent,
    ProductSpecificationMapComponent,
    ItemSpecificationMapComponent,
    CategoryVariantMapComponent,
    AdminDashboardComponent,
    ProductVariantComponent,
    VerifyItemComponent,
    VerifyItemListComponent,
 PublicLandingCategoryComponent,
    HomePageComponent,
    PublicProductCategoryComponent,
    CategoryVariantMapComponent,
    DocumentverificationComponent,
    VendorDocumentComponent,
    ManagestoreComponent,
    VendorBankDetailsComponent,
    TestComponent,
    ManagegallaryComponent,
    VendorOrderListComponent,
    CancelOrderRequestComponent,
    SearchresultComponent,
    CancelOrderVerifyComponent,
    ReturnOrderRequestComponent,
    ReturnOrderVerifyComponent,
    DirectCartComponent,
    DirectCartAddressComponent,
    DirectCartSelectPaymentComponent,
    DirectCartPlaceOrderComponent,
    DirectCartOrderConfirmComponent,
    OrderwisePaymentListComponent,
    CustomerListComponent,
   VendorListComponent,
   ShowAllItemListComponent,
    AcceptDeliveryComponent,
    DeliverLoginCreationComponent,
    PublicCartComponent,
    PublicDirectCartComponent,
    VendorReassignComponent,
    DashboardComponent,
    HubprofileComponent,
    MasterPincodeComponent,
    HubRouteComponent,
    VendortohubComponent,
    MasterTransportComponent,
    MasterCountryComponent,
    MasterStateComponent,
    MasterCityComponent,
    ConsignmentComponent,
    ItemHandoverComponent,
      ItemHandoverListComponent,
      ManagefacilitationcenterComponent,
      TestPageComponent,
      HubConsignmentListComponent,
      HubManagerLoginCreationComponent,

      HubShippingListComponent,
      HubArrivedDestinationComponent,
      HubShippedComponent,
      CreateFacilitationComponent,
      AssignItemFromVendorComponent,
      FcConsignmentListComponent,
      NewOrderListComponent,
      FcFacilitationToCustomerComponent,
      FcFacilitationToHubComponent,
      DeliveryToCustomerComponent,
      HubtofacilitationcenterComponent,
      FacilitationcenterRouteComponent,
      VendorVerifyComponent,
      CreateHubVehicleComponent,
      MasterVehicleTypeComponent,
      AssignedBatchListComponent,
      FcHubOrHubFcAssignComponent,
      FcToHubDeliveryComponent,
      HubToFcDeliveryComponent,
MasterFacilitationComponent,
MapFacilitationPincodeComponent,
HubToHubAssignComponent,
AddMultipleimageComponent,
HubManagerListComponent,
FacilitationManagerListComponent,
SendHubToHubComponent,
ReceiveHubToHubComponent,
FacilitationConsignmentComponent,






  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     //NgMultiSelectDropDownModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CarouselModule,

    NgxEditorModule.forRoot({

      locals: {
        // menu
        bold: 'Bold',
        italic: 'Italic',
        code: 'Code',
        blockquote: 'Blockquote',
        underline: 'Underline',
        strike: 'Strike',
        bullet_list: 'Bullet List',
        ordered_list: 'Ordered List',
        heading: 'Heading',
        h1: 'Header 1',
        h2: 'Header 2',
        h3: 'Header 3',
        h4: 'Header 4',
        h5: 'Header 5',
        h6: 'Header 6',
        align_left: 'Left Align',
        align_center: 'Center Align',
        align_right: 'Right Align',
        align_justify: 'Justify',
        text_color: 'Text Color',
        background_color: 'Background Color',

        // popups, forms, others...
        url: 'URL',
        text: 'Text',
        openInNewTab: 'Open in new tab',
        insert: 'Insert',
        altText: 'Alt Text',
        title: 'Title',
        remove: 'Remove',
      },  }),



    NgxPaginationModule,
     Ng2SearchPipeModule,
     NgxSpinnerModule,
     //NgxBarcodeModule,
     //NgxBarcode6Module,
     NgxPrintModule



  ],
  providers: [AuthService,
        AuthGuard,
        DataService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AppModule { }


