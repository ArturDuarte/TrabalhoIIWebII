<template>
  <div id="app">
    <!--<Emitente></Emitente>-->
    <Slide>
      <img src="./image/logo.png"/>
      <a id="Cat" href="#/CadastraCategoria">
        <span>Categorias</span>
      </a>
      <a id="CatPro" href="#/CadastroProdutos">
        <span>Produtos</span>
      </a>
    </Slide>
    <router-view></router-view>
  </div>
</template>

<script>
  import {Slide} from 'vue-burger-menu'
  export default {
    name: 'app',
    components: {
      Slide
    }
  }
</script>

<style>
  img {
    height: 70%;
    width: 70%;
  }

  #app {
    background-image: url('./image/TelaMercado.png');
    background-size: auto;
    height: 100%;
    width: 100%;
    position: absolute;

  }

  /* CSS da barra lateral tem que esta aqui no APP por que na home ele não reconhece*/
  .bm-menu {
    height: 100%; /* 100% Full-height */
    width: 0; /* 0 width - change this with JavaScript */
    position: fixed; /* Stay in place */
    z-index: 1000; /* Stay on top */
    top: 0;
    left: 0;
    background-color: rgba(10, 65, 90, 0.47); /* Black*/

    overflow-x: hidden; /* Disable horizontal scroll */
    padding-top: 20px; /* Place content 60px from the top */
    transition: 0.7s; /*0.5 second transition effect to slide in the sidenav*/
  }

  .bm-burger-button {
    position: fixed;
    width: 30px;
    height: 24px;
    left: 30px;
    top: 30px;
    cursor: pointer;
  }

  .bm-burger-bars {
    background-color: rgba(35, 48, 71, 0.36);
  }

  .line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
  }

  .cross-style {
    position: absolute;
    top: 12px;
    right: 2px;
    cursor: pointer;
  }

  .bm-cross {
    background: #bdc3c7;
  }

  .bm-cross-button {
    height: 24px;
    width: 24px;
  }

  .bm-item-list {
    color: #b8b7ad;
    margin-left: 10%;
    font-size: 20px;
  }

  .bm-item-list > * {
    display: flex;
    text-decoration: none;
    padding: 0.7em;
  }

  .bm-item-list > * > span {
    margin-bottom: -5px;
    margin-left: 10px;
    font-weight: 400;
    color: #eeeeee;
  }
</style>
