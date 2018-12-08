package br.com.analize.compras.resource;

//Classe de controle que ira fazer os GETs pegando o objeto todo ou apenas
//um determinado conteudo com o id

import br.com.analize.compras.entity.Categoria;
import br.com.analize.compras.entity.Pedido;
import br.com.analize.compras.service.CategoriaService;
import br.com.analize.compras.service.PedidoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/pedidos")
public class PedidoResource {

    @Autowired
    private PedidoService pedidoService;

    @RequestMapping(method = RequestMethod.GET, path = "/{id}")
    public ResponseEntity<Pedido> buscarPedido(@PathVariable("id") Integer id) {
        Pedido categoria = pedidoService.buscarPedidoPorId(id);
        return ResponseEntity.ok().body(categoria);
    }
}