<template>
  <ConfirmPopup />
  <Toast />
  <div class="card">
    <h5>Sipariş Listesi</h5>
    <DataTable
      :value="orders"
      v-model:expandedRows="expandedRows"
      v-model:filters="filters"
      filterDisplay="row"
      :loading="loading"
      :globalFilterFields="['orderNumber', 'country']"
      dataKey="id"
      responsiveLayout="scroll"
      @rowExpand="onRowExpand"
      @rowCollapse="onRowCollapse"
    >
      <template #header>
        <div class="flex justify-content-between flex-column sm:flex-row">
          <Button
            type="button"
            icon="pi pi-filter-slash"
            label="Clear"
            class="p-button-outlined mb-2"
            @click="clearFilter()"
          />
        </div>
      </template>
      <template #empty> Sipariş bulunamadı. </template>
      <template #loading> Lütfen bekleyin. </template>
      <Column :expander="true" headerStyle="width: 3rem" />
      <Column
        field="orderNumber"
        filterField="orderNumber"
        header="Sipariş No"
        :sortable="true"
      >
        <template #body="{ data }">
          {{ data.orderNumber }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            :placeholder="`Search by name - `"
            v-tooltip.top.focus="'Hit enter key to filter'"
          />
        </template>
      </Column>
      <Column
        field="country"
        filterField="country"
        header="Ülke"
        :sortable="true"
      >
        <template #body="{ data }">
          {{ data.country }}
        </template>
        <template #filter="{ filterModel, filterCallback }">
          <InputText
            type="text"
            v-model="filterModel.value"
            @keydown.enter="filterCallback()"
            class="p-column-filter"
            :placeholder="`Search by name - `"
            v-tooltip.top.focus="'Hit enter key to filter'"
          />
        </template>
      </Column>
      <Column
        field="deadline"
        filterField="deadline"
        header="Termin Tarihi"
        :sortable="true"
      >
        <template #body="{ data }">
          {{ formatDate(data.deadline) }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            dateFormat="mm-dd-yy"
            placeholder="mm-dd-yy"
          />
        </template>
      </Column>
      <Column
        field="createDate"
        filterField="createDate"
        header="Oluşturma Tarihi"
        :sortable="true"
      >
        <template #body="{ data }">
          {{ formatDate(data.createDate) }}
        </template>
        <template #filter="{ filterModel }">
          <Calendar
            v-model="filterModel.value"
            dateFormat="mm-dd-yy"
            placeholder="mm-dd-yy"
          />
        </template>
      </Column>
      <Column header="">
        <template #body="slotProps">
          <Button
            label="Sil"
            class="p-button-danger p-button-outlined"
            icon="pi pi-trash"
            @click="deleteOrderDialog(slotProps.data.id, $event)"
            iconPos="right"
          />
        </template>
      </Column>
      <template #expansion="slotProps">
        <div class="p-3">
          <h5>{{ slotProps.data.orderNumber }} No'lu Sipariş Detayı</h5>
          <DataTable
            :value="slotProps.data.orderDetails"
            responsiveLayout="scroll"
          >
            <template #empty> Sipariş bulunamadı. </template>
            <template #loading> Lütfen bekleyin. </template>
            <Column
              field="productModel"
              header="Ürün Modeli"
              :sortable="true"
            />
            <Column field="pattern" header="Desen" :sortable="true" />
            <Column field="season" header="Sezon" :sortable="true" />
            <Column field="color" header="Renk" :sortable="true" />
            <Column field="sizeSet" header="Ölçü Seti" :sortable="true" />
            <Column field="size" header="Ölçü" :sortable="true" />
            <Column field="piece" header="Adet" :sortable="true" />
          </DataTable>
        </div>
      </template>
    </DataTable>
  </div>
</template>

<script>
import { FilterMatchMode, FilterOperator } from "primevue/api";

import moment from "moment";

import OrderService from "../service/OrderService";
import OrderDetailService from "../service/OrderDetailService";

export default {
  data() {
    return {
      orders: [],
      expandedRows: [],

      filters: null,
      loading: true,
    };
  },
  methods: {
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm");
    },
    deleteOrderDialog(orderId, event) {
      this.$confirm.require({
        target: event.target,
        message: "Siparişi silmek istediğinize emin misiniz?",
        icon: "pi pi-info-circle",
        acceptClass: "p-button-danger",
        acceptLabel: "Evet",
        rejectLabel: "Hayır",
        accept: () => {
          this.deleteOrder(orderId);
        },
        reject: () => {
          this.$toast.add({
            severity: "warn",
            summary: "Uyarı!",
            detail: "Silme işlemini reddeddiniz.",
            life: 3000,
          });
        },
      });
    },
    onRowExpand(event) {
      let orderId = event.data.id;
      this.orderDetailService
        .getOrderDetailsByOrder(orderId)
        .then((response) => {
          event.data.orderDetails = response.data.data;
        });
    },
    onRowCollapse(event) {
      console.log(event);
    },
    deleteOrder(orderId) {
      this.orderService.deleteOrder(orderId).then((response) => {
        console.log(response);
        this.$toast.add({
          severity: "success",
          summary: "Başarılı!",
          detail: "Sipariş silindi.",
          life: 3000,
        });
        this.loadOrders();
      });
    },
    loadOrders() {
      this.orderService.getOrders().then((response) => {
        if (response.data.success) {
          this.orders = response.data.data;
          this.loading = false;
        }
      });
    },
    clearFilter() {
      this.initFilters();
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        orderNumber: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        country: {
          operator: FilterOperator.AND,
          constraints: [
            { value: null, matchMode: FilterMatchMode.STARTS_WITH },
          ],
        },
        deadline: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
        createDate: {
          operator: FilterOperator.AND,
          constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }],
        },
      };
    },
  },
  created() {
    this.orderService = new OrderService();
    this.orderDetailService = new OrderDetailService();

    this.initFilters();
  },
  mounted() {
    this.loadOrders();
  },
};
</script>