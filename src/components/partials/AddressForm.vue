<template>
  <el-row>
    <el-form status-icon :model="addressForm" size="small" ref="addressFormValidate" :rules="addressFormRules" v-if="!editAdressObj">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="name" label="Nome">
            <el-input type="text" placeholder="Casa, trabalho, etc..." v-model="addressForm.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="16">
          <el-form-item prop="cep" label="CEP">
            <el-input maxlength="8" type="text" placeholder="Digite o CEP" @keyup.native="handleInput" v-model="addressForm.cep">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8">
        <el-button type="text" @click="findMyCepNumber">Não sei o meu CEP</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24">
          <el-form-item prop="logradouro" label="Endereço">
            <el-input type="text" placeholder="Rua, Avenida, etc..." v-model="addressForm.logradouro">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12">
          <el-form-item prop="complemento" label="Número">
            <el-input type="text" placeholder="Digite o complemento" v-model="addressForm.complemento">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <el-form-item prop="bairro" label="Bairro">
            <el-input type="text" placeholder="Digite o bairro" v-model="addressForm.bairro">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="14">
          <el-form-item prop="cidade" label="Cidade">
            <el-input type="text" placeholder="Digite a cidade" v-model="addressForm.cidade">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10">
          <el-form-item prop="uf" label="UF">
            <el-input type="text" placeholder="Digite o estado" v-model="addressForm.uf">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24">
          <el-form-item class="form-buttons">
            <el-button plain @click="cancelForm('addressFormValidate')">Cancelar</el-button>
            <el-button type="success" :loading="isLoading" @click="submitForm('addressFormValidate')">Salvar endereço</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-form status-icon :model="editAddressForm" size="small" ref="editAddressFormValidate" :rules="editAddressFormRules" v-else>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12">
          <el-form-item prop="name" label="Nome">
            <el-input type="text" :placeholder="editAdressObj.name" v-model="editAddressForm.name">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <el-form-item prop="cep" label="CEP">
            <el-input maxlength="8" type="text" :placeholder="editAdressObj.cep" @keyup.native="handleInput" v-model="editAddressForm.cep">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :span="24">
          <el-form-item prop="logradouro" label="Endereço">
            <el-input type="text" :placeholder="editAdressObj.logradouro" v-model="editAddressForm.logradouro">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="12">
          <el-form-item prop="complemento" label="Número">
            <el-input type="text" :placeholder="editAdressObj.complemento" v-model="editAddressForm.complemento">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="12">
          <el-form-item prop="bairro" label="Bairro">
            <el-input type="text" :placeholder="editAdressObj.bairro" v-model="editAddressForm.bairro">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="14">
          <el-form-item prop="cidade" label="Cidade">
            <el-input type="text" :placeholder="editAdressObj.cidade" v-model="editAddressForm.cidade">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="24" :md="10">
          <el-form-item prop="uf" label="UF">
            <el-input type="text" :placeholder="editAdressObj.uf" v-model="editAddressForm.uf">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="24">
          <el-form-item class="form-buttons">
            <el-button plain @click="cancelForm('editAddressFormValidate')">Cancelar</el-button>
            <el-button type="success" :loading="isLoading" @click="submitForm('editAddressFormValidate')">Salvar endereço</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  props: [
    'editAdressObj'
  ],
  data () {
    const checkCep = (rule, value, callback) => {
      setTimeout(() => {
        if (!this.validateCep()) {
          callback(new Error('CEP inválido'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      isLoading: false,
      addressForm: {
        cep: '',
        name: '',
        bairro: '',
        cidade: '',
        logradouro: '',
        uf: '',
        complemento: ''
      },
      editAddressForm: {
        cep: '',
        name: '',
        bairro: '',
        cidade: '',
        logradouro: '',
        uf: '',
        complemento: '',
        oldCep: ''
      },
      addressFormRules: {
        name: [
          { required: true, message: 'Por favor, inserir um nome para o endereço', trigger: 'blur' }
        ],
        cep: [
          { required: true, message: 'Por favor, preencher CEP', trigger: 'blur' },
          { validator: checkCep, trigger: 'change' }
        ],
        bairro: [
          { required: true, message: 'Por favor, preencher bairro', trigger: 'blur' }
        ],
        cidade: [
          { required: true, message: 'Por favor, preencher cidade', trigger: 'blur' }
        ],
        logradouro: [
          { required: true, message: 'Por favor, preencher endereço', trigger: 'blur' }
        ],
        uf: [
          { required: true, message: 'Por favor, preencher estado', trigger: 'blur' }
        ]
      },
      editAddressFormRules: {
        cep: [
          { validator: checkCep, trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.isLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.editAdressObj) {
            const newAddress = Object.assign({}, this.addressForm)
            this.$emit('submit', newAddress)
          } else {
            Object.keys(this.editAddressForm).forEach((key) => {
              if (this.editAddressForm[key] === '') {
                this.editAddressForm[key] = this.editAdressObj[key]
              }
            })
            const editedValuesAddress = Object.assign({}, this.editAddressForm)
            this.$emit('submit', editedValuesAddress)
          }
          this.isLoading = false
          this.$refs[formName].resetFields()
        }
        this.isLoading = false
        return false
      })
    },
    cancelForm (formName) {
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    updateAddress (formName) {
      this.isLoading = true
      const newAddress = Object.assign({}, this.isEditAddress)
      this.$emit('submit', newAddress)
      this.isLoading = false
      this.$refs[formName].resetFields()
    },
    validateCep () {
      const validCepRegex = /^[0-9]{8}$/
      let cepNumber
      if (!this.editAdressObj) {
        cepNumber = this.addressForm.cep ? this.addressForm.cep.replace('-', '') : this.addressForm.cep
      } else {
        cepNumber = this.editAddressForm.cep ? this.editAddressForm.cep.replace('-', '') : this.editAdressObj.cep
      }
      return validCepRegex.test(cepNumber)
    },
    handleInput (e) {
      if (isNaN(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
        e.preventDefault()
        return false
      }
      if (this.validateCep()) {
        const validCep = this.addressForm.cep.length > 0 ? this.addressForm.cep : this.editAddressForm.cep
        axios.get(`https://viacep.com.br/ws/${validCep}/json/`)
          .then(response => response.data)
          .then((data) => {
            if (!this.editAdressObj) {
              this.addressForm.bairro = data.bairro
              this.addressForm.cidade = data.localidade
              this.addressForm.logradouro = data.logradouro
              this.addressForm.uf = data.uf
            } else {
              this.editAddressForm.bairro = data.bairro
              this.editAddressForm.cidade = data.localidade
              this.editAddressForm.logradouro = data.logradouro
              this.editAddressForm.uf = data.uf
              this.editAddressForm.oldCep = this.editAdressObj.cep
            }
          })
          .catch(err => console.log(err))
      }
    },
    findMyCepNumber () {
      return window.open('http://www.buscacep.correios.com.br/sistemas/buscacep/', '_blank').focus()
    }
  },
  computed: {
    formCompleted () {
      return false
    }
  }
}
</script>

<style lang="css" scoped>
  form.el-form {
    max-width: 700px;
    margin: 0 auto;
  }
  .form-buttons {
    text-align: right;
    margin-top: 15px;
  }
</style>
