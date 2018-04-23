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
        <address-list :addresses="addresses" @click="handleRemoveAddress"></address-list>
      </el-col>
    </el-row>
    <el-dialog width="65%" title="Adicionar novo endereço" :visible.sync="addNewAddress">
      <address-form @submit="handleSubmitAddress"></address-form>
    </el-dialog>
  </div>
</template>

<script>
import AddressList from '@/components/partials/AddressList.vue'
import AddressForm from '@/components/partials/AddressForm.vue'

export default {
  data () {
    return {
      addNewAddress: false,
      addresses: []
    }
  },
  components: {
    AddressList,
    AddressForm
  },
  created () {
    if (this.$ls.get('list')) {
      this.addresses = this.$ls.get('list')
    }
  },
  methods: {
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
      this.$confirm('Isso irá remover o endereço permanentemente. Prosseguir?', 'Warning', {
        confirmButtonText: 'Sim',
        cancelButtonText: 'Cancelar',
        type: 'warning'
      }).then(() => {
        const newList = this.addresses.filter(element => element.cep !== cep)
        this.addresses = newList
        this.$message({
          type: 'success',
          message: 'Endereço removido.'
        })
      }).catch((err) => {
        console.log(err)
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
