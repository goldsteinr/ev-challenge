<template>
  <el-row>
    <el-form status-icon :model="addressForm" ref="addressFormValidate" :rules="addressFormRules">
      <el-row :gutter="20">
        <el-col :span="12" :offset="6">
          <el-form-item prop="cep">
            <el-input maxlength="8" type="text" placeholder="Digite o seu CEP" @keyup.native="handleInput" v-model="addressForm.cep">
              <template slot="prepend">CEP*:</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
        <el-button type="text" @click="findMyCepNumber">Não sei o meu CEP</el-button>
        </el-col>
      </el-row>
    </el-form>
  </el-row>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    const checkCep = (rule, value, callback) => {
      const cepNumber = value
      if (!cepNumber) {
        return callback(new Error('Preencha o CEP'))
      }
      setTimeout(() => {
        if (!this.validateCep()) {
          callback(new Error('CEP inválido'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      addressForm: {
        cep: '',
        name: '',
        bairro: '',
        complemento: '',
        cidade: '',
        logradouro: '',
        uf: ''
      },
      addressFormRules: {
        cep: [
          { validator: checkCep, trigger: 'change' }
        ]
      },
      show: true
    }
  },
  methods: {
    validateCep () {
      const validCepRegex = /^[0-9]{8}$/
      const cepNumber = this.addressForm.cep ? this.addressForm.cep.replace('-', '') : this.addressForm.cep
      return validCepRegex.test(cepNumber)
    },
    handleInput (e) {
      if (isNaN(e.key) && e.key !== 'Backspace' && e.key !== 'Enter') {
        e.preventDefault()
        return false
      }
      if (this.validateCep()) {
        axios.get(`https://viacep.com.br/ws/${this.addressForm.cep}/json/`)
          .then(response => response.data)
          .then((data) => {
            this.addressForm.bairro = data.bairro
            this.addressForm.cidade = data.localidade
            this.addressForm.logradouro = data.logradouro
            this.addressForm.uf = data.uf
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
