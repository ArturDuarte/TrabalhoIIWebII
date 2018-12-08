<template>
  <div id="categoria">
    <b-form>
      <div id="topoForm" class="row">
        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
          <p>Cadastro de Categoria</p>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
          <b-link id="fechar" href="#/">X</b-link>
        </div>
      </div>
      <hr/>
      <b-form-input id="CampCat" required type="text" placeholder="Nova Categoria" v-model="categoria.nome"></b-form-input>
        <b-button type="submit" id="butonSalvar" @click="salvarCategoria">SALVAR</b-button>
      <br>
      <hr/>
      <p>Lista de Categoria</p>
      <b-form-select id="ListCat" required="required" v-model="selected" :options="options" class="mb-3"/>
      <div id="But" class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <b-button type="submit" id="buttonDelet" @click="deletaCategoria">DELETE</b-button>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
          <b-btn id="buttonEditar" type="submit" @click="showModal">EDITAR</b-btn>
        </div>
      </div>
    </b-form>
    <!-- Modal Component -->
    <modal id="modal" name="hello-world">
      <div id="topoFForm" class="row">
        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
          <p>Edição de Categoria</p>
          <hr/>
          <p>Escolha uma Categoria</p>
          <b-form-select id="ListCCat" v-model="selectedCat" :options="options" class="mb-3"/>
          <b-form-input id="CampCCat" type="text" placeholder="Nova Categoria"
                        v-model="categoriaModal.nome"></b-form-input>
          <hr/>
          <b-btn id="btnSalvar" class="mt-3" variant="outline-primary" block @click="editaCategoria">Salvar</b-btn>
          <br><br>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
          <b-btn id="fecharModal" @click="hideModal">X</b-btn>
        </div>
        <hr/>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: "CadastraCategoria",
    created() {
      var that = this;
      this.$http.get('http://localhost:8081/categorias').then(response => {
        // pega o conteudo de response e converte para o select fazendo o forEach
        response.body.forEach(function (categoria) {

          that.options.push(categoria);

        })

      });
    },
    data() {
      return {
        selected: null,
        categoria: {
          nome: ""
        },
        categoriaModal: {
          nome: ""
        },
        options: []
      }
    },

    methods: {
      showModal() {
        this.$modal.show("hello-world")
      },
      hideModal() {
        this.$modal.hide("hello-world")
      },

      salvarCategoria() {
        var that = this;
        this.$http.post('http://localhost:8081/categorias', this.categoria).then(response => {

          var categoria = {
            value: response.body.id,
            text: response.body.nome
          };

          that.options.push(categoria);
          // console.log(response);
          alert("Salvo com sucesso!");
          this.limpaCampos();
        }, response => {

        });
      },

      deletaCategoria() { //selected pega do select a informação nome da categoria para enviar apenas o seu id
        var that = this;
        // alert(this.selected);

        this.$http.delete('http://localhost:8081/categorias/' + this.selected).then(response => {
          this.options.forEach(function (objeto, indice) {
            if (objeto.value === that.selected) {
              that.options.splice(indice, 1);
            }
          });
          alert("Deletado com sucesso");

        }, response => {
          alert("Erro ao deletar o objeto, categoria " + that.selected + " não pode ser deletado por conter produtos");
        });
      },

      editaCategoria() {
        var that = this;
        console.log(that.selectedCat);
        // alert(that.selectedCat);
        // alert(that.categoriaModal.nome);

        var categoria = {
          id: that.selectedCat,
          nome: that.categoriaModal.nome
        };

        this.$http.put('http://localhost:8081/categorias/' + categoria.id, categoria).then(response => {

          var categoriaIn = {
            value: that.selectedCat,
            text: that.categoriaModal.nome
          };
          this.options.forEach(function (objeto, indice) {
            if (objeto.value === that.selectedCat) {
              that.options.splice(indice, 1);
              that.options.push(categoriaIn);
            }
          });
          alert("salvo");
          this.limpaCampos();
        });

      },

      limpaCampos() {
        this.categoria.nome = "";
        this.categoriaModal.nome = "";
        this.selectedCat = "";

      }
    }
  }
</script>

<style scoped>

  #categoria {
    color: white;
    margin-top: 10%;
    background-color: rgba(10, 90, 118, 0.82); /* Black*/
    width: 40%;
    height: 50%;
    padding: 20px;
    margin-left: 30%;
  }

  hr {
    background: white;
  }

  #fechar {
    color: red;
  }

  #topoForm {
    margin-top: -10px;
    margin-right: -5px;
  }

  #topoFForm {
    background-color: rgba(10, 71, 97, 0.82); /* Black*/
    margin-top: -1px;
    margin-right: -1px;
  }

  #modal {
    background-color: rgba(10, 90, 118, 0.82); /* Black*/
  }

  #topoFForm p {
    margin-left: 30px;
    margin-top: 10px;
    color: white;
  }

  #butonSalvar {
    margin-top: 5px;
    height: 30px;
    font-size: 12px;
    background: #62ce67;
  }

  #buttonDelet {
    margin-top: -15px;
    height: 30px;
    font-size: 12px;
    background: #f91323;
  }

  #buttonEditar {
    margin-top: -15px;
    height: 30px;
    font-size: 12px;
    background: #59b2f9;
  }

  #CampCat {
    height: 30px;
  }

  #CampCCat {
    margin-left: 30px;
  }

  #ListCat {
    height: 40px;
  }

  #ListCCat {
    margin-left: 30px;
  }

  #btnSalvar {
    margin-left: 30px;
  }

  #fecharModal {
    background: none;
    border: none;
    color: red;
  }
</style>
