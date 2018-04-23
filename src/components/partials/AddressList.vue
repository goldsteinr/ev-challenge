<template>
  <div>
    <el-row>
      <el-col :span="8" v-for="address in addresses" :key="address.cep">
        <el-card :body-style="{ padding: '0px' }">
          <div class="google-maps">
            <iframe
              width="100%"
              height="250"
              frameborder="0" style="border:0"
              :src="getMapSrc(address)" allowfullscreen>
            </iframe>
          </div>
          <div style="padding: 14px;">
            <h3 class="card-title">{{ address.name }}</h3>
            <div class="bottom clearfix">
              <p>{{ address.logradouro }}</p>
              <p>{{ address.bairro }} - {{ address.uf }}</p>
              <p>{{ address.cep }}</p>
              <br>
              <el-button type="primary" icon="el-icon-edit" circle @click="editAddress()"></el-button>
              <el-dialog width="65%" title="Editar lugar" :visible.sync="addNewAddress">
                <address-form @submit="handleSubmitAddress" :is-edit-address="address"></address-form>
              </el-dialog>
              <el-button type="danger" icon="el-icon-delete" circle @click="removeAddress(address.cep)"></el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import AddressForm from '@/components/partials/AddressForm.vue'

export default {
  props: ['addresses'],
  components: {
    AddressForm
  },
  data () {
    return {
      addNewAddress: false
    }
  },
  methods: {
    getMapSrc (address) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9CUGqfNQqx-dZGRThotjPTfAIQaTf768&q=${address.logradouro},${address.cidade}+${address.uf}`
    },
    removeAddress (cep) {
      this.$emit('click', cep)
    },
    handleSubmitAddress (newAddress) {
      this.addNewAddress = true
      this.$emit('change', newAddress)
      // this.$emit('submit', newAddress)
    },
    editAddress () {
      this.addNewAddress = true
    }
  }
}
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }
  .card-title {
    margin: 5px;
  }
  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
  .el-card {
    margin: 10px;
  }
  .bottom p {
    margin: 2px 0;
  }
</style>
