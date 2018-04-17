<template>
  <b-container fluid>
    <b-form @submit="onSubmit" v-if="show">
      <b-form-group id="exampleInputGroup1"
                    label="CEP:"
                    label-for="exampleInput1">
        <b-form-input id="exampleInput1"
                      type="email"
                      v-model="form.email"
                      required
                      placeholder="Insira seu CEP">
        </b-form-input>
        <b-button variant="link" href="http://www.buscacep.correios.com.br/sistemas/buscacep/" target="_blank">Não sei meu CEP</b-button>
      </b-form-group>
      <b-button type="submit" variant="outline-success">Avançar</b-button>
    </b-form>
  </b-container>
</template>

<script>
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
    }
  }
}
</script>
