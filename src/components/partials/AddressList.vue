<template>
  <div>
    <el-row :gutter="10">
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
            <span><strong>{{ address.name }}</strong></span>
            <div class="bottom clearfix">
              <span>{{ address.cidade }}</span>
              <el-button type="text" class="button">Editar</el-button>
              <el-button type="text" class="button">Remover</el-button>
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
    }
  }
}
</script>

<style scoped>
  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  .clearfix:after {
      clear: both
  }
</style>
