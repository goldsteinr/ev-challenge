<template>
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
      <div class="bottom clearfix" >
        <p>{{ address.cep }}</p>
        <p>{{ address.logradouro }}, {{ address.complemento }}</p>
        <p>{{ address.bairro }}</p>
        <p>{{ address.cidade }} - {{ address.uf }}</p>
        <br>
        <el-button type="primary" icon="el-icon-edit" circle @click="handleEditAddress()"></el-button>
        <el-button type="danger" icon="el-icon-delete" circle @click="removeAddress(address.cep)"></el-button>
      </div>
    </div>
    <el-dialog width="65%" :title="`Editar endereço (${address.name})`" :visible.sync="editAddress">
      <address-form @submit="handleSubmitAddress" @cancel="handleCancelEditAddress" :editAdressObj="address"></address-form>
    </el-dialog>
  </el-card>
</template>

<script>
import AddressForm from '@/components/partials/AddressForm.vue'

export default {
  props: ['address'],
  data () {
    return {
      editAddress: false
    }
  },
  components: {
    AddressForm
  },
  methods: {
    getMapSrc (address) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9CUGqfNQqx-dZGRThotjPTfAIQaTf768&q=${address.logradouro}+${address.complemento},${address.cidade}+${address.uf}`
    },
    removeAddress (cep) {
      this.$emit('click', cep)
    },
    handleEditAddress () {
      this.editAddress = true
    },
    handleSubmitAddress (editedAddress) {
      this.$emit('change', editedAddress)
      this.editAddress = false
    },
    handleCancelEditAddress () {
      this.editAddress = false
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
