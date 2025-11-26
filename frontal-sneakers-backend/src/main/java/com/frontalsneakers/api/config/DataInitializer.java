package com.frontalsneakers.api.config;

import com.frontalsneakers.api.model.Product;
import com.frontalsneakers.api.model.Role;
import com.frontalsneakers.api.model.User;
import com.frontalsneakers.api.repository.ProductRepository;
import com.frontalsneakers.api.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

        @Bean
        public CommandLineRunner commandLineRunner(
                        UserRepository userRepository,
                        ProductRepository productRepository,
                        PasswordEncoder passwordEncoder) {
                return args -> {
                        // --- Inicialização de Usuários ---
                        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
                                var admin = User.builder()
                                                .name("Admin")
                                                .email("admin@admin.com")
                                                .password(passwordEncoder.encode("@Admin123"))
                                                .role(Role.ADMIN)
                                                .build();
                                userRepository.save(admin);
                        }
                        if (userRepository.findByEmail("user@user.com").isEmpty()) {
                                var user = User.builder()
                                                .name("User")
                                                .email("user@user.com")
                                                .password(passwordEncoder.encode("@User123"))
                                                .role(Role.USER)
                                                .build();
                                userRepository.save(user);
                        }

                        // --- Inicialização de Produtos ---
                        if (productRepository.count() == 0) {
                                List<Product> products = getProducts();
                                productRepository.saveAll(products);
                                System.out.println("Produtos carregados com sucesso!");
                        }
                };
        }

        private List<Product> getProducts() {
                return Arrays.asList(
                                Product.builder()
                                                .brand("Adidas")
                                                .name("ADI2000")
                                                .price(799.99)
                                                .description(
                                                                """
                                                                                O Adi2000 é novo para essas características de filtro em nosso website, na categoria Homem. Mas você já pode visualizar as imagens acima e ter mais detalhes, para conhecer o produto de diferentes ângulos em primeira mão. Se você já experimentou o Adi2000 antes, deixe um comentário a seguir para nos contar o que você achou.
                                                                                Ainda estamos trabalhando para obter mais informações sobre o Adi2000 aqui, então não esqueça de retornar ao site em breve.
                                                                                """)
                                                .images("/assets/products-images/ADI2000.png")
                                                .sizes("34,35,37,38,39,40,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Adidas")
                                                .name("Tênis Harden Volume 9")
                                                .price(1399.99)
                                                .description(
                                                                """
                                                                                Continuando a construir sobre sua lenda e legado, o mais recente tênis exclusivo de James Harden e da adidas Basketball foi projetado para jogadores que vivem os maiores momentos do jogo.
                                                                                Esse tênis de basquete de alto desempenho foi projetado para suportar o tipo de movimento que fez de Harden uma superestrela nas quadras.
                                                                                Uma entressola combinada de BOOST e Lightstrike proporciona um leve retorno de energia.
                                                                                """)
                                                .images("/assets/products-images/Harden Volume 9.png")
                                                .sizes("34,35,36,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Adidas")
                                                .name("Tênis Hoops 4.0 Mid")
                                                .price(449.99)
                                                .description(
                                                                "Com um toque moderno nos modelos clássicos de basquete adidas, este tênis de cano alto foi criado para mostrar seu amor pelo esporte aonde quer que você vá. O cabedal em couro sintético é detalhado com uma biqueira de suede. O solado de borracha oferece durabilidade e aderência.")
                                                .images("/assets/products-images/Hoops 4.0 Mid.png")
                                                .sizes("34,35,36,37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Adidas")
                                                .name("Tênis Campus 00s")
                                                .price(699.99)
                                                .description(
                                                                "Este tênis adidas aproveita os elementos icônicos do Campus 80s para dar um toque inspirado no skate da próxima geração. Conhecida por sua durabilidade e pela forma como se molda aos seus pés ao longo do tempo, o suede ajuda a proporcionar longevidade e uma pisada segura.")
                                                .images("/assets/products-images/Campus 00s.png")
                                                .sizes("36,37,38,39,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Adidas")
                                                .name("Tênis Megaride O1")
                                                .price(1199.99)
                                                .description(
                                                                "Estilo urbano com conforto excepcional. Este tênis adidas Megaride O1 exibe uma inovadora entressola Megaride para uma corrida ultramacia. O colarinho de neoprene acolchoado no cabedal em malha elástica adiciona conforto e amortecimento.")
                                                .images("/assets/products-images/Megaride O1.png")
                                                .sizes("38,39,40,41")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Asics")
                                                .name("Tênis ASICS Dynablast 5 Branco/Rosa")
                                                .price(529.99)
                                                .description(
                                                                """
                                                                                O DYNABLAST 5 tem muita versatilidade e é ideal para aqueles que procuram conforto para as suas corridas e treinos. O engineered jacquard mesh e a língueta em mesh melhoram o ajuste, o conforto e a respirabilidade do calçado. A entressola e o solado são projetados para garantir melhor eficiencia da passada.
                                                                                """)
                                                .images("/assets/products-images/Dynablast 5.png")
                                                .sizes("34,37,38,39,40,41")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Asics")
                                                .name("Tênis ASICS GEL-Quantum Kinetic")
                                                .price(959.99)
                                                .description(
                                                                """
                                                                                O GEL-QUANTUM KINETIC combina design experimental com detalhes funcionais para o dia a dia. A sua capacidade de desempenho é combinada com componentes técnicos para criar um design moderno construído para a exploração urbana. Apresenta nossa tecnologia Scutoid GEL que possui uma geometria 3D compacta.
                                                                                """)
                                                .images("/assets/products-images/GEL-Quantum Kinetic.png")
                                                .sizes("34,35,36,37,40,41,42")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Asics")
                                                .name("Tênis ASICS Metaspeed Sky Paris")
                                                .price(2199.99)
                                                .description(
                                                                "O METASPEED SKY PARIS foi projetado para corredores com estilo de passadas mais largas que desejam correr mais rápido. Graças a uma espuma mais energética na entressola e a uma placa de carbono propulsora, os corredores serão capazes de conservar mais energia enquanto mantêm o ritmo.")
                                                .images("/assets/products-images/Metaspeed Sky Paris.png")
                                                .sizes("34,37,38,39,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Asics")
                                                .name("Tênis ASICS Novablast 5")
                                                .price(999.99)
                                                .description(
                                                                "A nova geometria da entressola do NOVABLAST 5 ajuda a criar mais energia durante as corridas. O FF BLAST MAX ajuda a criar a máxima experiencia em conforto e mais retorno de energia durante as passadas. A construção em asa de língueta no cabedal ajuda a melhorar o ajuste.")
                                                .images("/assets/products-images/Novablast 5.png")
                                                .sizes("34,35,37,38,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Asics")
                                                .name("Tênis ASICS GEL-NYC")
                                                .price(719.99)
                                                .description(
                                                                "O GEL-NYC é inspirado na história e em estilos modernos de corrida de performance. A construção do cabedal é uma referência ao GEL-NIMBUS 3 do começo dos anos 2000. Em uma combinação de espumas leves e inserções de tecnologia GEL.")
                                                .images("/assets/products-images/GEL-NYC.png") // Imagem inferida, pois
                                                                                               // estava vazia no CSV
                                                                                               // original
                                                .sizes("34,35,36,37,40,41,42")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Jordan")
                                                .name("Tênis Air Jordan 1 Mid")
                                                .price(1139.99)
                                                .description(
                                                                "Inspirado no AJ1 original, essa edição cano médio mantém o visual icônico que você ama, enquanto a escolha de cores e o couro conferem uma identidade distinta.")
                                                .images("/assets/products-images/Tênis Air Jordan 1 Mid.png")
                                                .sizes("34,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Jordan")
                                                .name("Women's Air Jordan 1 Brooklyn Low")
                                                .price(1299.99)
                                                .description(
                                                                "Couro de flor integral luxuoso combina com uma plataforma robusta para dar um toque especial ao seu estilo pessoal. Bolsas exageradas do solado e amortecimento Nike Air dão suporte a cada passo. Um diamante inserido no calcanhar exibe a insígnia do Jumpman.")
                                                .images("/assets/products-images/Women's Air Jordan 1 Brooklyn Low.png")
                                                .sizes("34,38,39,40,41")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Jordan")
                                                .name("Air Jordan 1 Retro Low OG")
                                                .price(1234.99)
                                                .description(
                                                                "Do basquete à moda, o AJ1 mudou o jogo do calçado para sempre. Com base no seu legado, esta edição marcante combina couro branco premium com toques brilhantes de University Red para um acabamento ultra-limpo. A marca Nike Air na língua é complementada pelo logotipo Wings bordado no calcanhar.")
                                                .images("/assets/products-images/Air Jordan 1 Retro Low OG.png")
                                                .sizes("34,35,36,37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Jordan")
                                                .name("Tênis Jordan Spizike Low Masculino")
                                                .price(779.99)
                                                .description(
                                                                "Prepare-se para arrasar com o Tênis Jordan Spizike Low Masculino, feito com materiais de alta qualidade que garantem durabilidade e estilo. O cabedal em material resistente proporciona conforto e suporte durante o uso, enquanto a entressola macia oferece amortecimento responsivo.")
                                                .images("/assets/products-images/Jordan Spizike Low.png")
                                                .sizes("34,35,36,37,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Jordan")
                                                .name("Tênis Jordan Flight Court")
                                                .price(541.49)
                                                .description(
                                                                "Inspirado no passado, construído para o amanhã. Nós remixamos elementos do AJ3, AJ4 e AJ5 para criar uma nova versão dos clássicos. Material macio e camurça macia proporcionam estilo e durabilidade, enquanto os painéis têxteis acrescentam respirabilidade.")
                                                .images("/assets/products-images/Tênis Jordan Flight Court.png")
                                                .sizes("34,35,36,37,38,39")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Mizuno")
                                                .name("Tênis de Corrida Mizuno Neo Aura Knit")
                                                .price(799.99)
                                                .description(
                                                                "O Neo Aura Knit traz a nova sensação de propulsão com a entressola Mizuno Enerzy NXT, infundida com nitrogênio para oferecer amortecimento superior e alto retorno de energia a cada passada. O cabedal em knit respirável e elástico garante ajuste perfeito.")
                                                .images("/assets/products-images/Mizuno Neo Aura Knit.png")
                                                .sizes("40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Mizuno")
                                                .name("Tênis Masculino Mizuno Wave Prophecy 14")
                                                .price(1499.99)
                                                .description(
                                                                "A entressola possui a tecnologia Infinity Wave em toda a sua extensão dando a ele um visual moderno e tecnológico. O cabedal, com referência ao estilo esportivo moderno, conta com monofilamento que garante um design inovador. Solado com tecnologia X10.")
                                                .images("/assets/products-images/Mizuno Wave Prophecy 14.png")
                                                .sizes("34,35,36,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Mizuno")
                                                .name("Tênis Mizuno Wave Rebellion Pro 3")
                                                .price(1499.99)
                                                .description(
                                                                "Perfeita combinação de retorno de energia e angulação da passada para os dias de prova. Desenvolvido para quebrar seus RPs, a entressola possui Mizuno Enerzy XP. O cabedal é feito em Engineered Mesh, gerando um ajuste perfeito.")
                                                .images("/assets/products-images/Mizuno Wave Rebellion Pro 3.png")
                                                .sizes("34,35,36,37,38,39")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Mizuno")
                                                .name("Tênis Masculino Mizuno Wave Stratos 3")
                                                .price(799.99)
                                                .description(
                                                                "Um tênis com design moderno que te acompanha em todas as suas atividades. Possui a tecnologia Mizuno Wave e Mizuno Enerzy em toda extensão da entressola, proporcionando maior estabilidade, amortecimento e maciez.")
                                                .images("/assets/products-images/Mizuno Wave Stratos 3.png")
                                                .sizes("34,35,36,37,38,39,40")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Mizuno")
                                                .name("Chuteira Mizuno Alpha Japan")
                                                .price(1099.99)
                                                .description(
                                                                "Criado para jogadores que buscam uma chuteira leve e flexível com sensação de descalço. As chuteiras Alpha são projetadas especificamente para velocidade, para jogadores que buscam a excelência. Estas chuteiras são o resultado da inovação japonesa da Mizuno.")
                                                .images("/assets/products-images/Mizuno Alpha Japan.png")
                                                .sizes("37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("New Balance")
                                                .name("Tênis New Balance Nb Numeric Tiago Lemos 808 Lite")
                                                .price(599.99)
                                                .description(
                                                                "Confie na alta performance do Tênis New Balance 808 Lite Tiago Lemos Lite. Com design atualizado e inspirado no brasileiro que é referência no skate mundial de alto nível, oferece a durabilidade e a proteção contra impactos que Tiago adora.")
                                                .images("/assets/products-images/Nb Numeric Tiago Lemos 808 Lite.png")
                                                .sizes("34,35,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("New Balance")
                                                .name("Tênis New Balance 1000")
                                                .price(1099.99)
                                                .description(
                                                                "O 1000 está de volta. Diretamente dos nossos arquivos, o modelo lançado em 1999 refletia o estilo ousado e futurista da época. Nesta versão, a construção tradicional em mesh com sobreposições de camurça foi reinventada.")
                                                .images("/assets/products-images/Balance 1000.png")
                                                .sizes("34,35,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("New Balance")
                                                .name("Tênis New Balance Fuelcell Supercomp Trainer V3")
                                                .price(1599.99)
                                                .description(
                                                                "O Tênis de Corrida New Balance Elite V4 Masculino foi desenvolvido para garantir máxima performance, rapidez e propulsão em competições. Alcance seu melhor desempenho no dia da prova com o NB SC Elite V4.")
                                                .images("/assets/products-images/Fuelcell Supercomp Trainer V3.png")
                                                .sizes("34,35,36,37,38,39,40,41")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("New Balance")
                                                .name("Tênis New Balance 550")
                                                .price(549.99)
                                                .description(
                                                                "O New Balance 550 original foi lançado em 1989 e rapidamente deixou sua marca nas quadras de basquete. Após seu primeiro lançamento, o modelo foi arquivado por anos, até ser relançado em edições limitadas no fim de 2020.")
                                                .images("/assets/products-images/Balance 550.png")
                                                .sizes("34,35,36,37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("New Balance")
                                                .name("Tênis New Balance 9060")
                                                .price(1299.99)
                                                .description(
                                                                """
                                                                                O New Balance 9060 é a evolução da clássica série 99X, trazendo um olhar contemporâneo para o estilo refinado e a inovação que marcaram essa linha. As barras de estabilidade herdadas do 990 ganham destaque ao se expandirem por todo o cabedal.
                                                                                """)
                                                .images("/assets/products-images/Balance 9060.png")
                                                .sizes("34,35,36,37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Nike")
                                                .name("Tênis Nike Air Max Excee")
                                                .price(351.49)
                                                .description(
                                                                "Entre no ritmo com o Nike Air Max Excee e toques sutis de cores novas para um estilo que desafia o tempo. Inspirado no Nike Air Max 90, este tênis oferece um toque moderno em um ícone lendário por meio de linhas de design alongadas e proporções distorcidas.")
                                                .images("/assets/products-images/Air Max Excee.png")
                                                .sizes("34,35,36,37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Nike")
                                                .name("Tênis Nike Flex Experience Run 12")
                                                .price(332.49)
                                                .description(
                                                                "Mantenha-se firme e progrida em direção aos seus objetivos de corrida no Flex Experience 12. Mínimo com amplitude total de movimento do calcanhar aos dedos do pé, ele foi feito para se mover a cada passada.")
                                                .images("/assets/products-images/Flex Experience Run 12.png")
                                                .sizes("34,35,36,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Nike")
                                                .name("Tênis Nike SB Force 58")
                                                .price(360.99)
                                                .description(
                                                                "A melhor e mais recente novidade a aparecer nas ruas, o Force 58 garante a durabilidade da forma da sola com a flexibilidade de um tênis vulcanizado. Feito de lona e camurça e com acabamento perfurado na região dos dedos.")
                                                .images("/assets/products-images/SB Force 58.png")
                                                .sizes("34,38,39,40,41,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Nike")
                                                .name("Nike Manoa")
                                                .price(788.49)
                                                .description(
                                                                "Apresenta couro viçoso na parte de cima, uma boca acolchoada e um piso robusto, com estilo para a estação. A língua engomada foi projetada para ajudar a manter os detritos fora da bota.")
                                                .images("/assets/products-images/Manoa.png")
                                                .sizes("34,35,36,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Nike")
                                                .name("Air Max 95 OG")
                                                .price(930.99)
                                                .description(
                                                                "Inspirado no corpo humano e na estética esportiva dos anos 90, o Air Max 95 combina conforto inacreditável com estilo ágil. Os painéis laterais ondulados adicionam fluidez natural a qualquer look.")
                                                .images("/assets/products-images/Air Max 95 OG.png")
                                                .sizes("34,35,36,37,38,39,40,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Oakley")
                                                .name("Light Breathe")
                                                .price(1280.00)
                                                .description(
                                                                "Tênis Oakley em cabedal de dupla camada em malha para extrema respirabilidade, forro em malha leve, atacador padrão em nylon trançado. Solado Vibram SPider Lock com entressola em EVA.")
                                                .images("/assets/products-images/Light Breathe.png")
                                                .sizes("34,35,36,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Oakley")
                                                .name("Tênis Masc Mod Teeth 1 Piet")
                                                .price(800.00)
                                                .description(
                                                                "Direto da colaboração entre a Oakley e Piet, uma das marcas mais icônicas de streetwear. É feito com cabedal robusto com recortes em material resistente e cores contrastantes. A entressola em EVA proporciona máximo conforto.")
                                                .images("/assets/products-images/Masc Mod Teeth 1 Piet.png")
                                                .sizes("34,35,36,37,38,39,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Oakley")
                                                .name("Tênis Oakley Claws")
                                                .price(640.00)
                                                .description(
                                                                "O modelo CLAWS surge para referenciar os clássicos tênis de skate dos anos 90, com uma aparência robusta e cheia de estilo. Feito principalmente de camurça, oferece durabilidade e um visual vintage autêntico.")
                                                .images("/assets/products-images/Claws.png")
                                                .sizes("34,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Oakley")
                                                .name("Vertex Boot")
                                                .price(1536.00)
                                                .description(
                                                                "Bota Impermeável Oakley com Solado Vibram, Solado Vibram 856K Nuasi para tração e durabilidade excepcionais, sistema de amarração de nylon traçado. Haste de aço para maior rigidez e suporte durante caminhadas e trilhas.")
                                                .images("/assets/products-images/Vertex Boot.png")
                                                .sizes("34,35,36,37,38,42,43,44")
                                                .quantity(5)
                                                .build(),

                                Product.builder()
                                                .brand("Oakley")
                                                .name("Coyote Boot")
                                                .price(760.00)
                                                .description(
                                                                "As botas Oakley Coyote Boot foram pensadas levando em conta um objetivo específico. Nasceram da necessidade de proteger, mas evoluíram graças às suas características. Estas botas provaram que podem se adaptar e encarar qualquer desafio.")
                                                .images("/assets/products-images/Coyote Boot.png")
                                                .sizes("34,35,36,37,38,39,40,41,42,43,44")
                                                .quantity(5)
                                                .build());
        }
}