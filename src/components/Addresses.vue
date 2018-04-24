<template>
  <div>
    <el-row :gutter="10">
        <el-col :span="24">
          <el-button class="new-address-btn" type="success" icon="el-icon-plus" @click="addNewAddress = true">Adicionar endereço</el-button>
        </el-col>
    </el-row>
    <hr v-if="addresses.length > 0">
    <el-row v-if="addresses.length > 0" :gutter="10">
      <el-col :span="24">
        <h2>Meus endereços</h2>
        <el-row>
          <el-col :md="8" :xs="24" :sm="12" :lg="6" :xl="4" v-for="address in addresses" :key="address.cep">
            <address-card :location="currentLocation" :address="address" @click="handleRemoveAddress" @change="handleAddressChange"></address-card>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-dialog width="65%" title="Adicionar novo endereço" :visible.sync="addNewAddress">
      <address-form @submit="handleSubmitAddress" @cancel="handleCancelSubmitAddress"></address-form>
    </el-dialog>
  </div>
</template>

<script>
import AddressCard from '@/components/partials/AddressCard.vue'
import AddressForm from '@/components/partials/AddressForm.vue'

export default {
  data () {
    return {
      addNewAddress: false,
      addresses: [],
      currentLocation: {}
    }
  },
  components: {
    AddressCard,
    AddressForm
  },
  created () {
    navigator.geolocation.getCurrentPosition(location => {
      this.currentLocation = location.coords
    }, () => this.$message({
      type: 'error',
      message: 'Não foi possível verificar a sua localização.'
    }))
    if (this.$ls.get('list')) {
      this.addresses = this.$ls.get('list')
    }
  },
  methods: {
    handleCancelSubmitAddress () {
      this.addNewAddress = false
    },
    handleSubmitAddress (address) {
      let addressExists = false
      this.addresses.forEach((i) => {
        if (i.cep === address.cep || i.name === address.name) {
          addressExists = true
        }
      })
      if (addressExists) {
        this.$message({
          type: 'error',
          message: 'O endereço adicionado já existe!'
        })
        return false
      }
      this.addresses.push(address)
      this.addNewAddress = false
      this.$message({
        type: 'success',
        message: 'O novo endereço foi adicionado.'
      })
      this.$ls.set('list', this.addresses)
    },
    handleRemoveAddress (cep) {
      this.$confirm('Isso irá remover o endereço permanentemente. Prosseguir?', 'Aviso:', {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        const newList = this.addresses.filter(element => element.cep !== cep)
        this.addresses = newList
        this.$ls.set('list', this.addresses)
        this.$message({
          type: 'success',
          message: 'Endereço removido.'
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleAddressChange (editedAddress) {
      this.addresses.forEach((a, index) => {
        if (a.cep === editedAddress.oldCep) {
          this.addresses[index] = editedAddress
          this.$forceUpdate()
          this.$ls.set('list', this.addresses)
          this.$message({
            type: 'success',
            message: 'Endereço atualizado!'
          })
        }
        return false
      })
    }
  }
}
</script>

<style>
 .new-address-btn {
   margin-bottom: 1em;
 }
 .el-notification, .el-message-box, .el-message {
   font-family: 'Avenir', Helvetica, sans-serif;
 }
</style>
