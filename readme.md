### Software engineer Quiz App - README

## Aspectos Técnicos

### Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor e criação de aplicações web modernas
- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset tipado de JavaScript para desenvolvimento mais seguro
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida e responsiva
- **Shadcn/UI**: Componentes de UI reutilizáveis baseados em Radix UI
- **Radix UI**: Biblioteca de componentes primitivos acessíveis


### Arquitetura

- **Client-side Rendering**: A aplicação utiliza o hook `useState` do React para gerenciar o estado da aplicação no lado do cliente
- **Componentes Funcionais**: Todos os componentes são implementados como funções React com hooks
- **Gerenciamento de Estado**: Estado local gerenciado com `useState` para controlar o fluxo do quiz
- **Estrutura de Dados**: Dados do quiz armazenados em um objeto JSON estruturado por tópicos e subtópicos


## Caso de Uso

Esta aplicação foi projetada para:

1. **Educação e Treinamento**: Ideal para estudantes e profissionais que desejam testar seus conhecimentos em desenvolvimento de software
2. **Preparação para Certificações**: Ajuda na preparação para exames de certificação em tecnologia
3. **Avaliação de Conhecimento**: Permite que instrutores avaliem o nível de compreensão dos alunos sobre tópicos específicos
4. **Aprendizado Autodirigido**: Oferece feedback imediato para aprendizado independente


## Como Ampliar o Quiz

### Adicionando Mais Questões

Para aumentar o número de questões além das 5 atuais:

1. **Expandir o Arquivo de Dados**: Navegue até `lib/quiz-data.ts`
2. **Adicionar Novos Subtópicos**: Para cada tópico existente, você pode adicionar mais objetos de subtópico com a estrutura:

```typescript
{
  "titulo": "Título do Subtópico",
  "conteudo": "Conteúdo detalhado do subtópico que será usado para gerar perguntas e respostas."
}
```


3. **Adicionar Novos Tópicos**: Você pode adicionar novos tópicos principais seguindo a estrutura existente:

```typescript
"NOVO_TÓPICO": [
  {
    "titulo": "Subtópico 1",
    "conteudo": "Conteúdo do subtópico 1..."
  },
  {
    "titulo": "Subtópico 2",
    "conteudo": "Conteúdo do subtópico 2..."
  }
  // Adicione quantos subtópicos desejar
]
```




### Modificações Necessárias ao Adicionar Conteúdo

1. **Ajustar Geração de Perguntas**: Se você adicionar muitos subtópicos, pode ser necessário ajustar a função `generateQuestions` em `app/page.tsx` para limitar o número de perguntas por sessão ou implementar paginação.
2. **Otimizar Geração de Respostas Incorretas**: Com mais conteúdo, você pode melhorar a função `generateIncorrectAnswers` para selecionar respostas incorretas mais relevantes ou desafiadoras.
3. **Considerar Categorização**: Se você adicionar muitos tópicos, pode ser útil implementar uma interface de seleção de categoria antes de iniciar o quiz.
4. **Ajustar Estilos**: Para respostas muito longas, pode ser necessário ajustar o CSS para garantir que o texto seja exibido corretamente.


## Estrutura de Diretórios e Arquivos

```plaintext
quiz-app/
├── app/
│   ├── layout.tsx       # Layout principal da aplicação
│   ├── page.tsx         # Componente principal do quiz
│   └── globals.css      # Estilos globais (incluindo Tailwind)
│
├── components/
│   ├── ui/              # Componentes de UI reutilizáveis
│   │   ├── button.tsx   # Componente de botão
│   │   ├── card.tsx     # Componente de card
│   │   ├── label.tsx    # Componente de label
│   │   ├── progress.tsx # Componente de barra de progresso
│   │   └── radio-group.tsx # Componente de grupo de radio buttons
│   └── theme-provider.tsx # Provedor de tema (claro/escuro)
│
├── lib/
│   ├── quiz-data.ts     # Dados do quiz (tópicos e subtópicos)
│   └── utils.ts         # Funções utilitárias
│
├── hooks/
│   ├── use-mobile.tsx   # Hook para detectar dispositivos móveis
│   └── use-toast.ts     # Hook para exibir notificações toast
│
├── next.config.mjs      # Configuração do Next.js
├── tailwind.config.ts   # Configuração do Tailwind CSS
├── tsconfig.json        # Configuração do TypeScript
└── package.json         # Dependências do projeto
```

## Melhorias Futuras

1. **Banco de Dados**: Migrar os dados do quiz para um banco de dados (MongoDB, PostgreSQL) para facilitar a gestão de conteúdo
2. **API de Perguntas**: Criar uma API para fornecer perguntas dinamicamente
3. **Sistema de Usuários**: Implementar autenticação para salvar o progresso dos usuários
4. **Análise de Desempenho**: Adicionar estatísticas e gráficos para acompanhar o desempenho ao longo do tempo
5. **Exportação de Resultados**: Permitir que os resultados sejam exportados em PDF ou enviados por e-mail
6. **Modo Competitivo**: Adicionar um sistema de ranking e competição entre usuários
7. **Personalização de Quiz**: Permitir que os usuários criem seus próprios quizzes


Este projeto foi desenvolvido com foco em escalabilidade e manutenibilidade, permitindo que seja facilmente expandido com mais conteúdo e funcionalidades conforme necessário.

### Como Rodar o Projeto Localmente

Para executar o projeto Quiz App em seu ambiente local, siga estas etapas:

## Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18.x ou superior recomendada)
- [npm](https://www.npmjs.com/) (geralmente vem com o Node.js) ou [yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/)
- [Git](https://git-scm.com/) (opcional, para clonar o repositório)


## Passos para Execução

### 1. Clone ou Baixe o Projeto

**Opção A: Usando Git**

```shellscript
git clone [URL_DO_REPOSITÓRIO]
cd quiz-app
```

**Opção B: Baixando os Arquivos**

- Baixe os arquivos do projeto como um arquivo ZIP
- Extraia o conteúdo para uma pasta chamada `quiz-app`
- Abra um terminal e navegue até a pasta:

```shellscript
cd caminho/para/quiz-app
```




### 2. Instale as Dependências

Escolha um dos seguintes gerenciadores de pacotes:

**Usando npm:**

```shellscript
npm install
```

**Usando yarn:**

```shellscript
yarn install
```

**Usando pnpm:**

```shellscript
pnpm install
```

### 3. Inicie o Servidor de Desenvolvimento

**Usando npm:**

```shellscript
npm run dev
```

**Usando yarn:**

```shellscript
yarn dev
```

**Usando pnpm:**

```shellscript
pnpm dev
```

### 4. Acesse a Aplicação

Abra seu navegador e acesse:

```plaintext
http://localhost:3000
```

O aplicativo Quiz App deve estar rodando e pronto para uso!

## Solução de Problemas Comuns

### Erro de Porta em Uso

Se a porta 3000 já estiver em uso, o Next.js tentará usar a próxima porta disponível (3001, 3002, etc.). Verifique o terminal para ver qual porta está sendo usada.

### Erros de Dependência

Se encontrar erros relacionados a dependências:

```shellscript
# Limpe o cache do npm
npm cache clean --force

# Reinstale as dependências
npm install
```

### Problemas com Node.js

Certifique-se de estar usando uma versão compatível do Node.js:

```shellscript
# Verifique sua versão
node -v

# Se precisar atualizar, visite: https://nodejs.org/
```

## Configuração para Produção

Para criar uma build de produção:

```shellscript
npm run build
```

Para iniciar a versão de produção:

```shellscript
npm start
```

## Modificando o Projeto

Após fazer alterações no código:

- O servidor de desenvolvimento (npm run dev) atualiza automaticamente a aplicação
- Para arquivos de configuração como `next.config.mjs` ou `tailwind.config.ts`, pode ser necessário reiniciar o servidor


Agora você deve ter o Quiz App rodando localmente e estar pronto para explorar ou modificar o código!
