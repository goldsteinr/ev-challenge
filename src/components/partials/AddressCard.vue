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
        <p class="center-align">
          <img v-if="weatherIcon.length > 0" :src="getIconWeather"> {{ currentWeather }}°C
        </p>
        <p>Distância até endereço: <span>{{ getDistanceKm }}km</span></p>
        <br>
        <el-button type="success" icon="el-icon-sort" circle @click="handleGoToAddress()"></el-button>
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
import getDistanceFromLatLonInKm from '@/js/helpers'
import axios from 'axios'

export default {
  props: ['address', 'location'],
  created () {
    this.getAddressGeoLocation()
  },
  data () {
    return {
      editAddress: false,
      currentWeather: '',
      addressLocation: {},
      weatherIcon: '',
      distanceKm: ''
    }
  },
  components: {
    AddressForm
  },
  computed: {
    getIconWeather () {
      return `http://openweathermap.org/img/w/${this.weatherIcon}.png`
    },
    getDistanceKm () {
      console.log(this.location.latitude)
      const distanceKm = getDistanceFromLatLonInKm(this.location.latitude, this.location.longitude, this.addressLocation.lat, this.addressLocation.lng)
      return distanceKm
    }
  },
  methods: {

    getMapSrc (address) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9CUGqfNQqx-dZGRThotjPTfAIQaTf768&q=${address.logradouro}+${address.complemento},${address.cidade}+${address.uf}`
    },
    getAddressGeoLocation () {
      axios.get(`http://maps.google.com/maps/api/geocode/json?address=${this.address.cep}+${this.address.logradouro},+${this.address.cidade},+${this.address.uf}`)
        .then(response => response.data)
        .then(data => {
          this.addressLocation = data.results[0].geometry.location
          this.getWeather()
        })
    },
    getWeather () {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${this.addressLocation.lat}&lon=${this.addressLocation.lng}&units=metric&appid=919ce9e9995bb7f1f6303ace0806f8a0`)
        .then(response => response.data)
        .then(data => {
          this.currentWeather = data.main.temp
          this.weatherIcon = data.weather[0].icon
        })
    },
    removeAddress (cep) {
      this.$emit('click', cep)
    },
    handleEditAddress () {
      this.editAddress = true
    },
    handleGoToAddress () {
      return window.open(`https://www.google.com/maps/dir/?api=1&origin=${this.location.latitude},${this.location.longitude}&destination=${this.address.cep}+${this.address.logradouro},+${this.address.cidade},+${this.address.uf}&travelmode=driving`, '_blank').focus()
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
  .center-align {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
