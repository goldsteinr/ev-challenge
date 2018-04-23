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
        <address-list :addresses="addresses"></address-list>
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
  methods: {
    handleSubmitAddress (address) {
      this.addresses.push(address)
      this.addNewAddress = false
      this.$notify({
        title: 'Sucesso!',
        type: 'success',
        message: 'O novo endereço foi adicionado.'
      })
    }
  }
}
</script>

<style>
 .new-address-btn {
   margin-bottom: 1em;
 }
</style>
