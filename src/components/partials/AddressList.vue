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
              <el-button type="text" class="button">Editar</el-button>
              <el-button type="text" class="button" @click="removeAddress(address.cep)">Remover</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['addresses'],
  data () {
    return {
    }
  },
  methods: {
    getMapSrc (address) {
      return `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9CUGqfNQqx-dZGRThotjPTfAIQaTf768&q=${address.logradouro},${address.cidade}+${address.uf}`
    },
    removeAddress (cep) {
      this.$emit('click', cep)
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
