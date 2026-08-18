# SYRAX

## Integrantes

* Kevelly Mendes de Oliveira
* Jhonatan Françozo de Caldas

## Sobre o produto

O produto é uma linha de capacetes premium para motociclistas, desenvolvida com foco em design, identidade e experiência.

A proposta não é apresentar o capacete apenas como um equipamento de segurança, mas como uma peça de expressão pessoal. Cada capacete possui uma identidade visual própria, inspirada em diferentes elementos da natureza, como fogo, água, terra, entre outros.

A coleção busca unir estética futurista, acabamento premium e personalidade, fazendo com que cada modelo tenha uma presença visual marcante.

O usuário deve sentir que não está simplesmente escolhendo um capacete, mas escolhendo um estilo e uma identidade que representam sua forma de pilotar.

Cada modelo da coleção possui:

* Nome próprio;
* Elemento associado;
* Cor e acabamento específicos;
* Identidade visual;
* Preço;
* Apresentação individual por meio de imagens e vídeos 3D.

A experiência do site deve transmitir a sensação de estar explorando uma coleção exclusiva. O produto deve ser o protagonista da experiência, utilizando grandes imagens, vídeos, animações suaves e transições que valorizem os detalhes de cada capacete.

A comunicação deve ter uma estética premium, tecnológica e minimalista, evitando a aparência de um e-commerce tradicional.

## Jornada de construção

### Ideia inicial

**Como surgiu a ideia do produto?**

A ideia surgiu a partir da experiência de Jhonatan com motocicletas e das referências visuais de Kevelly, principalmente das séries *A Casa do Dragão* e *Avatar*.

A partir dessas referências, começamos a desenvolver o conceito de uma linha de capacetes inspirada em diferentes elementos e personalidades. A proposta foi sendo amadurecida por meio de conversas, pesquisas e experimentações com ferramentas de IA.

**Quais alternativas foram consideradas?**

A proposta da linha de capacetes foi mantida desde o início. O que mudou ao longo do desenvolvimento foi principalmente a forma de apresentar e materializar essa ideia.

## Pesquisa e referências

### O que vocês pesquisaram?

Pesquisamos referências de marcas e produtos premium do segmento automotivo e motociclístico, buscando entender como apresentar produtos de alto valor de forma mais imersiva e visual.

Também analisamos sites de marcas como Ducati, BMW Motorrad, AGV e Shoei, observando principalmente a forma como utilizam imagens, vídeos, animações, tipografia e espaços em branco para destacar seus produtos.

Além do segmento de motocicletas, buscamos referências em marcas de tecnologia e design, como Apple e Nothing, principalmente pela utilização de interfaces minimalistas, grandes elementos visuais e transições suaves.

### Quais sites, produtos, estilos ou referências ajudaram na construção da solução?

* **Marcas de motocicletas:** referência para apresentação dos capacetes, sensação de velocidade e linguagem visual.
* **Marcas premium:** referência para transmitir exclusividade e valor por meio do design.
* **Apple:** referência de minimalismo, hierarquia visual e apresentação do produto como protagonista.
* **Nothing:** referência para estética tecnológica e identidade visual marcante.
* **Sites de produtos 3D:** referência para utilização de modelos 3D, vídeos de rotação e interação com o produto.

## Ferramentas utilizadas

* **React + TypeScript** — desenvolvimento da interface e dos componentes do site.
* **Vite** — configuração e execução do projeto React.
* **HTML + CSS** — estrutura e estilização da interface.
* **VS Code** — desenvolvimento e organização do código.
* **Figma** — criação do layout, prototipação e definição da identidade visual.
* **Figma Make** — geração inicial da estrutura do site e dos componentes.
* **Tripo3D** — geração e preparação dos modelos 3D dos capacetes.
* **Ferramentas de geração de imagens por IA** — criação e edição de imagens e elementos visuais.
* **Git/GitHub** — versionamento e organização do projeto.

## Uso de IA

### Quais modelos foram utilizados?

Durante o desenvolvimento, utilizamos diferentes modelos de IA de acordo com a necessidade de cada etapa:

* **GPT-5 Mini (Azure)**;
* **GPT-5.6 Luna (ChatGPT)**;
* **Claude Sonnet 5**.

### Para que cada modelo foi utilizado?

* **GPT-5 Mini:** foi utilizado inicialmente para ajustes e aprimoramento dos textos do projeto. Como era o modelo disponibilizado pela Azure, buscamos priorizar sua utilização antes de recorrer a outras ferramentas. Entretanto, em algumas situações, os resultados não apresentaram a qualidade ou precisão esperada, sendo necessário utilizar outros modelos.

* **GPT-5.6 Luna (ChatGPT):** foi utilizado principalmente durante o desenvolvimento do código, auxiliando na identificação e correção de erros, implementação de funcionalidades e ajustes visuais. Também foi utilizado para geração e edição de imagens utilizadas na apresentação do produto.

* **Claude Sonnet 5:** foi utilizado principalmente para trabalhar nas animações da interface por meio de código. O modelo apresentou resultados mais satisfatórios nesse tipo de tarefa, principalmente na criação de transições e interações mais fluidas.

### Como as sugestões das IAs foram utilizadas?

As sugestões geradas pelas IAs não foram aplicadas automaticamente. Os resultados foram analisados pela dupla e testados dentro do projeto.

Algumas sugestões foram **mantidas integralmente** quando apresentaram o resultado esperado. Outras foram **adaptadas**, principalmente quando era necessário adequá-las ao layout, à identidade visual ou ao funcionamento do projeto.

Também houve sugestões que foram **descartadas** por não apresentarem um resultado satisfatório ou por não se encaixarem na proposta visual da solução.

Durante o desenvolvimento, foi comum trocar de modelo conforme a necessidade. Inicialmente, buscávamos utilizar o GPT-5 Mini nos casos em que ele poderia atender à demanda, mas, quando o resultado não era satisfatório, recorríamos ao ChatGPT ou ao Claude.

Dessa forma, os modelos foram utilizados de maneira complementar, aproveitando os pontos fortes de cada um.

## Evolução da solução

### O que mudou entre a primeira ideia e a versão final?

* **Reorganização da página:** a estrutura foi alterada para criar uma experiência mais fluida e narrativa, conduzindo o usuário pela apresentação do produto.

* **Mudança na identidade visual:** ajustamos cores, tipografia, espaçamentos e elementos gráficos para alcançar uma estética mais premium, tecnológica e minimalista.

* **Troca e evolução das imagens:** passamos a utilizar imagens e modelos 3D dos capacetes, incluindo vídeos e animações para apresentar melhor os detalhes do produto.

* **Maior utilização de animações:** inicialmente, a interface era mais estática. Durante o desenvolvimento, adicionamos transições, movimentos e efeitos visuais para tornar a navegação mais imersiva.

* **Mudança na apresentação do produto:** o capacete deixou de ser apresentado apenas como um equipamento e passou a ser tratado como um produto de identidade, em que cada modelo possui uma personalidade e um elemento próprio.

* **Alterações sugeridas pelas IAs:** utilizamos as IAs para testar diferentes possibilidades de layout, animações, textos e implementações de código. Algumas sugestões foram incorporadas, enquanto outras foram modificadas ou descartadas após os testes.

* **Decisões da dupla:** em alguns momentos, optamos por não seguir sugestões da IA porque o resultado não correspondia à identidade visual que queríamos ou deixava a interface menos clara. A decisão final sempre foi baseada no que funcionava melhor para a proposta do projeto.

## Resultado final

### Como vocês avaliam o resultado?

Consideramos o resultado **satisfatório**. Gostaríamos de ter imagens e modelos 3D dos capacetes com qualidade ainda maior e maior fidelidade ao conceito visual definido, porém os recursos gratuitos disponíveis acabaram sendo uma limitação durante o desenvolvimento.

Ainda assim, considerando o tempo e as ferramentas que tínhamos disponíveis, estamos satisfeitos com o resultado entregue.

### O que fariam diferente se tivessem mais tempo?

**Planejamento.** Em muitos momentos, o desenvolvimento foi guiado pelo processo de experimentar, fazer e decidir conforme as ideias surgiam. Gostaríamos de ter tido mais tempo para definir a identidade visual, amadurecer a proposta e estruturar melhor a experiência antes de iniciar a implementação.

A ideia inicial também era bastante conceitual, sem uma análise aprofundada de viabilidade. Com mais tempo, teríamos realizado essa análise antes do desenvolvimento, avaliando melhor os recursos necessários, as limitações das ferramentas e a viabilidade de execução da proposta.
