<template>
  <div class="card p-fluid">
    <h5>Sipariş Oluştur</h5>
    <form @submit.prevent="handleSubmit(!v$.$invalid)" class="p-fluid">
      <div class="grid">
        <div class="col-5">
          <div class="field">
            <label for="orderNumber">Sipariş Numarası</label>
            <InputText id="orderNumber" v-model="orderNumber" type="text" />
          </div>
          <div class="formgrid grid">
            <div class="field col">
              <label for="countryId">Ülke</label>
              <Dropdown
                id="countryId"
                :options="countries"
                optionLabel="name"
                optionValue="id"
                v-model="countryId"
              ></Dropdown>
            </div>
            <div class="field col">
              <label for="termin">Termin</label>
              <Calendar v-model="deadline" inputId="termin"></Calendar>
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col">
              <label for="productModelId">Model</label>
              <Dropdown
                id="productModelId"
                :options="productModels"
                optionLabel="name"
                optionValue="id"
                v-model="productModelId"
              ></Dropdown>
            </div>
            <div class="field col">
              <label for="patternId">Desen</label>
              <Dropdown
                id="patternId"
                :options="patterns"
                optionLabel="name"
                optionValue="id"
                v-model="patternId"
              ></Dropdown>
            </div>
          </div>
          <div class="formgrid grid">
            <div class="field col">
              <label for="seasonId">Sezon</label>
              <Dropdown
                id="seasonId"
                :options="seasons"
                optionLabel="name"
                optionValue="id"
                v-model="seasonId"
              ></Dropdown>
            </div>
            <div class="field col">
              <label for="colorId">Renk</label>
              <Dropdown
                id="colorId"
                :options="colors"
                optionLabel="name"
                optionValue="id"
                v-model="colorId"
              ></Dropdown>
            </div>
          </div>
        </div>
        <div class="col-7">
          <div class="field">
            <label for="sizeSetId">Beden Seti</label>
            <Dropdown
              id="sizeSetId"
              :options="sizeSets"
              optionLabel="name"
              optionValue="id"
              v-model="sizeSetId"
              @change="sizeSetChange($event)"
            ></Dropdown>
          </div>
          <div class="field">
            <DataTable :value="sizesBySizeSet">
              <Column field="name" header="Beden"></Column>
              <Column header="Adet">
                <template #body="slotProps">
                  <label for="horizontal">Horizontal with Step</label>
                  <InputText type="hidden" v-model="sizeIds[slotProps.index]" />
                  <InputNumber
                    id="horizontal"
                    v-model="sizePieces[slotProps.index]"
                    showButtons
                    buttonLayout="horizontal"
                    :step="1"
                    :min="0"
                    decrementButtonClass="p-button-danger"
                    incrementButtonClass="p-button-success"
                    incrementButtonIcon="pi pi-plus"
                    decrementButtonIcon="pi pi-minus"
                    @input="pieceInput(slotProps)"
                  />
                </template>
              </Column>
            </DataTable>
          </div>
        </div>
        <div class="col-12 align-self-end">
          <Button type="submit" label="Sipariş oluştur" class="mt-2 w-auto" />
        </div>
      </div>
    </form>
  </div>
  <Toast />
</template>

<script>
import ColorService from "../service/ColorService";
import CountryService from "../service/CountryService";
import PatternService from "../service/PatternService";
import ProductModelService from "../service/ProductModelService";
import SeasonService from "../service/SeasonService";
import SizeService from "../service/SizeService";
import SizeSetService from "../service/SizeSetService";
import OrderService from "../service/OrderService";

import { required } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

import AddOrderModel from "../models/requestModels/AddOrderModel";
import AddOrderDetailModel from "../models/requestModels/AddOrderDetailModel";

export default {
  setup: () => ({ v$: useVuelidate() }),
  data() {
    return {
      orderNumber: "",
      colorId: null,
      countryId: null,
      deadline: null,
      productModelId: null,
      patternId: null,
      seasonId: null,
      sizeSetId: null,
      sizeIds: [],
      sizePieces: [],

      colors: [],
      countries: [],
      productModels: [],
      patterns: [],
      seasons: [],
      sizeSets: [],
      sizesBySizeSet: [],
    };
  },
  validations() {
    return {
      orderNumber: {
        required,
      },
      colorId: {
        required,
      },
      countryId: {
        required,
      },
      deadline: {
        required,
      },
      productModelId: {
        required,
      },
      patternId: {
        required,
      },
      seasonId: {
        required,
      },
      sizeSetId: {
        required,
      },
      sizeIds: {
        required,
      },
      sizePieces: {
        required,
      },
    };
  },
  methods: {
    sizeSetChange(event) {
      this.sizeService.getSizesBySizeSet(this.sizeSetId).then((response) => {
        console.log(event);
        console.log(response);
        if (response.data.success) {
          this.sizesBySizeSet = response.data.data;
        }
      });
    },

    pieceInput(slotProps) {
      this.sizeIds[slotProps.index] = slotProps.data.id;
    },

    handleSubmit(isFormValid) {
      console.log(isFormValid);
      console.log(this.$toast);

      if (isFormValid) {
        let order = this.createOrderModel();
        this.orderService
          .addOrder(order)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => console.log(error));
        console.log(order);
      } else {
        this.$toast.add({
          severity: "warn",
          summary: "Uyarı!",
          detail: "Lütfen tüm alanları doldurunuz.",
          life: 3000,
        });
      }
    },

    createOrderModel() {
      let order = new AddOrderModel();
      order.orderNumber = this.orderNumber;
      order.deadline = this.deadline;
      order.countryId = this.countryId;
      order.orderDetails = [];

      for (let i = 0; i < this.sizeIds.length; i++) {
        let orderDetail = new AddOrderDetailModel();
        orderDetail.productModelId = this.productModelId;
        orderDetail.patternId = this.patternId;
        orderDetail.seasonId = this.seasonId;
        orderDetail.colorId = this.colorId;
        orderDetail.sizeSetId = this.sizeSetId;
        orderDetail.sizeId = this.sizeIds[i];
        orderDetail.piece = this.sizePieces[i];

        order.orderDetails.push(orderDetail);
      }

      return order;
    },

    addOrder(order) {
      this.orderService.addOrder(order).then((response) => {
        console.log(response);
      });
    },
  },
  created() {
    this.colorService = new ColorService();
    this.countryService = new CountryService();
    this.patternService = new PatternService();
    this.productModelService = new ProductModelService();
    this.seasonService = new SeasonService();
    this.sizeService = new SizeService();
    this.sizeSetService = new SizeSetService();
    this.orderService = new OrderService();
  },
  mounted() {
    this.colorService.getColors().then((response) => {
      if (response.data.success) {
        this.colors = response.data.data;
      }
    });

    this.countryService.getCountries().then((response) => {
      if (response.data.success) {
        this.countries = response.data.data;
      }
    });

    this.patternService.getPatterns().then((response) => {
      if (response.data.success) {
        this.patterns = response.data.data;
      }
    });

    this.productModelService.getProductModels().then((response) => {
      if (response.data.success) {
        this.productModels = response.data.data;
      }
    });

    this.seasonService.getSeasons().then((response) => {
      if (response.data.success) {
        this.seasons = response.data.data;
      }
    });

    this.sizeSetService.getSizeSets().then((response) => {
      if (response.data.success) {
        this.sizeSets = response.data.data;
      }
    });
  },
};
</script>