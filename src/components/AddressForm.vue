<template>
  <b-container fluid>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-row>
        <b-input-group prepend="CEP*">
          <b-form-input @input="handleInput" :state="validateCep" v-model="form.cep" aria-describedby="inputLiveFeedback"/>
          <b-input-group-append>
            <b-btn href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank" size="sm" text="Não sei meu CEP" variant="link">Não sei meu CEP</b-btn>
          </b-input-group-append>
        </b-input-group>
        <b-form-invalid-feedback id="inputLiveFeedback">
          CEP Inválido
        </b-form-invalid-feedback>
      </b-form-row>
      <b-form-row>
        <b-button type="submit" variant="outline-success">Avançar</b-button>
      </b-form-row>
    </b-form>
  </b-container>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      form: {
        cep: null,
        name: ''
      },
      show: true
    }
  },
  methods: {
    onSubmit (e) {
      e.preventDefault()
      alert(JSON.stringify(this.form))
    },
    handleInput (e) {
      if (this.form.cep.length > 9) {
        this.form.cep = this.form.cep.slice(0, -1)
        return false
      }
      this.maskInputCep()
      if (this.validateCep) {
        axios.get(`https://viacep.com.br/ws/${this.form.cep.replace('-', '')}/json/`)
          .then(response => response.data)
          .then(data => console.log(data))
          .catch(err => console.log(err))
      }
    },
    maskInputCep () {
      const cepMask = '#####-##'
      const cepSize = this.form.cep.length
      const saida = cepMask.substring(1, 0)
      const texto = cepMask.substring(cepSize)
      if (texto.substring(0, 1) !== saida) {
        this.form.cep += texto.substring(0, 1)
      }
    }
  },
  computed: {
    validateCep () {
      const validCepRegex = /^[0-9]{8}$/
      const cepNumber = this.form.cep ? this.form.cep.replace('-', '') : this.form.cep
      return validCepRegex.test(cepNumber)
    }
  }
}
</script>
