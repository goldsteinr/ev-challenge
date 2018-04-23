<template>
  <el-row>
    <el-form label-position="left" label-width="80px" status-icon :model="addressForm" ref="addressFormValidate" :rules="addressFormRules">
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="name" label="Lugar">
            <el-input type="text" placeholder="Casa, trabalho, etc..." v-model="addressForm.name">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="cep" label="CEP">
            <el-input maxlength="8" type="text" placeholder="Digite o CEP" @keyup.native="handleInput" v-model="addressForm.cep">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
        <el-button type="text" @click="findMyCepNumber">Não sei o meu CEP</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="logradouro" label="Endereço">
            <el-input type="text" placeholder="Rua, Avenida, etc..." v-model="addressForm.logradouro">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item prop="bairro" label="Bairro">
            <el-input type="text" placeholder="Digite o bairro" v-model="addressForm.bairro">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="16">
          <el-form-item prop="cidade" label="Cidade">
            <el-input type="text" placeholder="Digite a cidade" v-model="addressForm.cidade">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item prop="uf" label="UF">
            <el-input type="text" placeholder="Digite o estado" v-model="addressForm.uf">
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-form-item>
            <el-button plain>Cancelar</el-button>
            <el-button type="success" :loading="isLoading" plain @click="submitForm('addressFormValidate')">Salvar endereço</el-button>
          </el-form-item>
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
      isLoading: false,
      addressForm: {
        cep: '',
        name: '',
        bairro: '',
        cidade: '',
        logradouro: '',
        uf: ''
      },
      addressFormRules: {
        name: [
          { required: true, message: 'Por favor, inserir um lugar', trigger: 'blur' }
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
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.isLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const newAddress = Object.assign({}, this.addressForm)
          this.$emit('submit', newAddress)
          this.isLoading = false
          this.$refs[formName].resetFields()
        }
        return false
      })
    },
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

<style lang="css" scoped>
  form.el-form {
    max-width: 700px;
    margin: 0 auto;
  }
</style>
