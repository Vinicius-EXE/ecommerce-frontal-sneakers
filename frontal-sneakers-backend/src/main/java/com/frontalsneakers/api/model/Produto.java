package com.frontalsneakers.api.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "produtos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(columnDefinition = "TEXT") // Para descrições longas
    private String descricao;

    @Column(nullable = false, unique = true)
    private String slug;

    @ManyToOne // Relação Muitos-para-Um
    @JoinColumn(name = "marca_id", nullable = false) // Chave estrangeira
    private Marca marca;

    @ManyToMany
    @JoinTable( // Cria uma tabela de ligação
            name = "produto_categoria",
            joinColumns = @JoinColumn(name = "produto_id"),
            inverseJoinColumns = @JoinColumn(name = "categoria_id")
    )
    private List<Categoria> categorias;

    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    // cascade = ALL: Se eu apagar um Produto, apaga as Variações
    // orphanRemoval = true: Se eu remover uma Variação da lista, ela é apagada do banco
    private List<VariacaoProduto> variacoes;
}
