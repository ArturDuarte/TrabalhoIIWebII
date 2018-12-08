<template>
  <div id="produto">
    <form>
      <div id="topoForm" class="row">
        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
          <p>Cadastro de Produtos</p>

        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
          <b-link id="fechar" href="#/">X</b-link>
        </div>
      </div>
      <hr/>
      <p>Lista de Categorias</p>
      <b-form-select id="ListCat" v-model="selected" :options="options" class="mb-3"/>
      <b-form-input id="CampCat" type="text" placeholder="Digite o produto" v-model="produto.nome"></b-form-input>
      <br>
      <b-form-input id="CampCat" type="number" placeholder="Digite o valor" v-model="produto.valor"></b-form-input>
      <b-button type="submit" id="butonSalvar" @click="salvarProduto">SALVAR</b-button>
      <br>
      <hr/>
      <p>Lista de Categorias</p>
      <div id="barrForm" class="row">
        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
          <b-form-select id="ListCat" v-model="selected" :options="options" class="mb-3"/>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
          <b-button type="submit" id="butonPesq" @click="apagaVetor">...</b-button>
        </div>
      </div>
      <p>Lista de Produtos</p>
      <b-form-select id="ListCat" v-model="selectedProd" :options="optionsProd" class="mb-3"/>
      <div id="But" class="row">
        <div class="col-lg-2 col-md-2 col-sm-2 col-xs-2">
          <b-button type="submit" id="buttonDelet" @click="deletaProduto">DELETE</b-button>
        </div>
        <div class="col-lg-10 col-md-10 col-sm-10 col-xs-10">
          <b-btn id="buttonEditar" type="submit" @click="showModal">EDITAR</b-btn>
        </div>
      </div>
    </form>
    <!-- Modal Component -->
    <modal id="modal" name="hello-world">
      <div id="topoFForm" class="row">
        <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
          <p>Edição de Produtos</p>
          <hr/>
          <div id="barrFForm" class="row">
            <div class="col-lg-11 col-md-11 col-sm-11 col-xs-11">
              <b-form-select id="ListCCat" v-model="selected" :options="options" class="mb-3"/>
            </div>
            <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
              <b-button type="submit" id="butonPPesq" @click="apagaVetor">...</b-button>
            </div>
          </div>
          <div id="barrorm" class="row">
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
            <b-form-select id="ListCCat" v-model="selectedProd" :options="optionsProd" class="mb-3"/>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
            <b-form-input id="CampCCat" type="text" placeholder="" v-model="produto.preco"></b-form-input>
            </div>
          </div>
          <div id="barrormm" class="row">
            <div class="col-lg-8 col-md-8 col-sm-8 col-xs-8">
              <b-form-input id="CampCCat" type="text" placeholder="Troque o nome " v-model="produtoModal.nome"></b-form-input>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-4 col-xs-4">
              <b-form-input id="CampCCat" type="text" placeholder="Troque o preço" v-model="produtoModal.preco"></b-form-input>
            </div>
          </div>
          <hr/>
          <b-btn id="btnSalvar" class="mt-3" variant="outline-primary" block @click="editaProduto">Salvar</b-btn>
          <br><br>
        </div>
        <div class="col-lg-1 col-md-1 col-sm-1 col-xs-1">
          <b-btn id="fecharModal" @click="hideModal">X</b-btn>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
  export default {
    name: "CadastroProdutos",
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
        produto: {
          nome: ""

        },
        selectedProd: null,
        produto: {
          nome: "",
          preco: ""
        },
        produtoModal: {
          nome: "",
          preco: ""
        },
        options: [],
        optionsProd: []
      }
    },
    methods: {
      showModal() {
        this.$modal.show("hello-world")
      },
      hideModal() {
        this.$modal.hide("hello-world")
      },

      carregaSelProdutos() {
        var that = this;
        // alert(this.selected);
        this.$http.get('http://localhost:8081/categorias/' + this.selected).then(response => {
          //carrega o select de produtos da categoria escolhida
          response.body.produtos.forEach(function (produtos) {
            var prod = {
              value: produtos.id,
              text: produtos.nome,
              preco: produtos.preco,
            };
            that.optionsProd.push(prod);

          })
        });
      },

      apagaVetor() {
        var that = this;
        // alert("apagando");
        // forEach que apaga o select todo
        this.optionsProd.forEach(function (objeto, indice) {
          that.optionsProd.splice(indice, 100);
        });
        this.carregaSelProdutos();
      },

      salvarProduto() {
        var produto = {
          nome: this.produto.nome,
          preco: this.produto.valor
        };
        this.$http.post('http://localhost:8081/produtos?idCategoria=' + this.selected, produto).then(response => {
          this.produto.nome = '';
          this.produto.valor = '';
          alert("Produto cadastrado com sucesso!")
        }, response => {
          alert("Erro ao salvar o Produto")
        });
      },

      deletaProduto() {
        var that = this;
        // alert(this.selectedProd);
        this.$http.delete('http://localhost:8081/produtos/' + that.selectedProd).then(response => {
          alert("Produto deletado com sucesso!");
          this.apagaVetor();
        }, response => {

        });
      },

      editaProduto() {
        var that = this;

        var produto = {
          id: that.selectedProd,
          nome: that.produtoModal.nome,
          preco: that.produtoModal.preco
        };

        this.$http.put('http://localhost:8081/produtos/' + that.selectedProd, produto ).then(response => {

          // var produtoIn = {
          //   value: that.selectedCat,
          //   text: that.categoriaModal.nome
          // };
          // this.options.forEach(function (objeto, indice) {
          //   if (objeto.value === that.selectedCat) {
          //     that.options.splice(indice, 1);
          //     that.options.push(categoriaIn);
          //   }
          // });
          alert("Produto alterado!");
          this.limpaCampos();
        });

      },
    }
  }
</script>

<style scoped>
  #produto {
    color: white;
    margin-top: 2%;
    background-color: rgba(10, 90, 118, 0.82); /* Black*/
    width: 40%;
    height: 85%;
    padding: 20px;
    margin-left: 30%;
  }

  hr {
    background: white;
  }

  #fechar {
    color: red;
  }

  #fecharModal {
    background: none;
    border: none;
    color: red;
  }

  #topoForm {
    margin-top: -10px;
    margin-right: -5px;
  }

  #butonSalvar {
    margin-top: 5px;
    height: 30px;
    font-size: 12px;
    background: #62ce67;
  }

  #butonPesq {
    margin-left: -20px;
    margin-top: 0;
    height: 41px;
    font-size: 12px;
    background: #0a4761;
  }

  #butonPPesq {
    margin-left: 15px;
    margin-top: 0;
    height: 41px;
    font-size: 12px;
    background: #0a4761;
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

  #ListCat {
    height: 40px;
  }

  #modal {
    background-color: rgba(10, 90, 118, 0.82); /* Black*/
  }

  #topoFForm {
    background-color: rgba(10, 71, 97, 0.82); /* Black*/
    margin-top: -1px;
    margin-right: -1px;
  }

  #topoFForm p {
    margin-left: 30px;
    margin-top: 10px;
    color: white;
  }

  #CampCCat {
    margin-left: 30px;
  }

  #ListCCat {
    margin-left: 30px;
  }

  #btnSalvar {
    margin-left: 30px;
  }
</style>
