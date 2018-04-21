<template>
  <el-card>
    <el-row :gutter="10">
        <el-col :span="24">
          <el-button type="success" icon="el-icon-plus" @click="addNewAddress = true">Adicionar endereço</el-button>
          <address-list></address-list>
        </el-col>
    </el-row>
    <el-dialog width="65%" title="Adicionar novo endereço" :visible.sync="addNewAddress">
      <address-form></address-form>
    </el-dialog>
  </el-card>
</template>

<script>
import AddressList from '@/components/partials/AddressList.vue'
import AddressForm from '@/components/partials/AddressForm.vue'

export default {
  data () {
    return {
      addNewAddress: false
    }
  },
  components: {
    AddressList,
    AddressForm
  }
}
</script>
