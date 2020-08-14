<template>
  <div>
    <Nav />

    <div class="container pt-4">
      <div class="btn-group mb-2">
        <button
          type="button"
          class="btn"
          v-bind:class="[isActive == 'total' ? 'btn-primary' : 'btn-light']"
          @click="filter('total')"
        >Total</button>
        <button
          type="button"
          class="btn"
          v-bind:class="[isActive == 'last' ? 'btn-primary' : 'btn-light']"
          @click="filter('last')"
        >Last month</button>
        <button
          type="button"
          class="btn"
          v-bind:class="[isActive == '' ? 'btn-primary' : 'btn-light']"
          @click="filter()"
        >This month</button>
      </div>

      <div class="row text-white">
        <div class="col-sm-12 col-md-3">
          <div class="rounded p-4 bg-warning mb-2 text-center">
            DOGE
            <h4>
              <span v-if="isLoading">?</span>
              <span v-else>{{ doge.toLocaleString() }}</span>
            </h4>
          </div>
        </div>

        <!-- <div class="col-sm-12 col-md-3">
          <div class="rounded p-4 bg-secondary mb-2 text-center">
            VND
            <h4>
              <span v-if="isLoading">?</span>
              <span v-else>{{ vnd.toLocaleString() }}</span>
            </h4>
          </div>
        </div>-->

        <div class="col-sm-12 col-md-3">
          <div class="rounded p-4 bg-primary mb-2 text-center">
            License
            <h4>
              <span v-if="isLoading">?</span>
              <span v-else>{{ license }}</span>
            </h4>
          </div>
        </div>

        <div class="col-sm-12 col-md-3">
          <div class="rounded p-4 bg-success mb-2 text-center">
            Pay
            <h4>
              <span v-if="isLoading">?</span>
              <span v-else>{{ pay }}</span>
            </h4>
          </div>
        </div>

        <div class="col-sm-12 col-md-3">
          <div class="rounded p-4 bg-danger mb-2 text-center">
            Free
            <h4>
              <span v-if="isLoading">?</span>
              <span v-else>{{ free }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav";
import axios from "axios";
import API_URL from "@/utils/apiUrl";
import moment from "moment";

export default {
  components: {
    Nav,
  },
  data() {
    return {
      isLoading: false,
      isActive: "",
      licenses: [],
      license: 0,
      free: 0,
      pay: 0,
      doge: 0,
      vnd: 0,
      from: 0,
      to: 0,
    };
  },
  mounted: function () {
    this.fetch();
  },
  methods: {
    fetch: function () {
      this.isLoading = !this.isLoading;
      axios({
        url: API_URL + "/license",
        method: "GET",
        headers: {
          token: localStorage.getItem("token"),
        },
      })
        .then((response) => {
          this.isLoading = !this.isLoading;
          this.licenses = response.data;
          this.filter();
        })
        .catch(() => this.$router.push({ path: "/login" }));
    },
    getPrice: async function () {
      let result = await axios({
        url: "https://api-prod.bitmoon.net/graphql",
        method: "POST",
        data: {
          query:
            "\n    query getPriceBookPaging ($page_size: Int, $page: Int, $sort_name: String, $sort_type: String, $search: String) {\n      apiPricebookPaging (page_size: $page_size, page: $page, sort_name: $sort_name, sort_type: $sort_type, search: $search){\n        total,\n        data {\n        id,\n        coin_id,\n        coin_name,\n        bid_price_usd,\n        fast_bid_price,\n        ask_price_usd,\n        bid_price_btc,\n        ask_price_btc,\n        bid_price_vnd,\n        ask_price_vnd,\n        fast_ask_price,\n        fast,\n        normal,\n        sort_no,\n        buy_profit,\n        sell_profit,\n        change_24h,\n        volume,\n        coin\n      }\n    }\n  }\n",
          variables: {
            page_size: 50,
            page: 1,
            sort_name: "volume",
            sort_type: "desc",
            search: "doge",
          },
        },
      });

      return result.data.data.apiPricebookPaging.data[0];
    },
    filter: function (type) {
      switch (type) {
        case "total":
          this.isActive = "total";
          this.from = moment("20200329");
          this.to = moment().endOf("month");
          break;
        case "last":
          this.isActive = "last";
          this.from = moment().subtract(1, "months").startOf("month");
          this.to = moment().subtract(1, "months").endOf("month");
          break;
        default:
          this.isActive = "";
          this.from = moment().startOf("month");
          this.to = moment().endOf("month");
          break;
      }

      this.license = 0;
      this.doge = 0;
      this.free = 0;
      this.pay = 0;
      this.licenses.map((license) => {
        if (
          new Date(license.time) >= new Date(this.from) &&
          new Date(license.time) <= new Date(this.to)
        ) {
          this.license += 1;
          if (license.type == "free") {
            this.free++;
          } else {
            this.pay++;
            this.doge += license.price.amount.pay;
          }
        }
      });

      // this.getPrice().then((response) => {
      //   // console.log(response);
      //   this.vnd = this.doge * response.fast_bid_price;
      // });
    },
  },
};
</script>

<style>
</style>