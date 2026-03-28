# DEMA Clean - Plataforma Digital

Projeto frontend em **React + Vite** para a DEMA Clean, pensado para abrir e evoluir facilmente no **Visual Studio Code**.

## Porque escolhi React

Escolhi **React** porque para este projeto faz mais sentido em termos de:

- **estrutura por componentes**, ideal para separar hero, serviços, reservas, reviews, FAQ e contactos;
- **facilidade de manutenção**, caso queiras crescer depois para mais páginas;
- **integração futura simples** com backend, APIs, Supabase, Firebase ou calendário;
- **bom ecossistema para UI**, formulários, animações e escalabilidade;
- **fluxo excelente em VS Code** com Vite, que arranca rápido e é simples de editar.

## O que já inclui

- interface moderna e responsiva;
- secção de serviços;
- área de reservas de **segunda a sábado**;
- validação para bloquear domingos;
- secção de reviews;
- FAQ;
- contactos rápidos;
- botão flutuante para contacto;
- estrutura organizada por componentes.

## Estrutura

```bash
src/
  components/
    AdvantagesSection.jsx
    BookingSection.jsx
    ContactSection.jsx
    FAQSection.jsx
    FloatingContact.jsx
    Footer.jsx
    Hero.jsx
    Navbar.jsx
    ReviewsSection.jsx
    SectionTitle.jsx
    ServicesSection.jsx
  data/
    content.js
  App.jsx
  main.jsx
  styles.css
```

## Como abrir no VS Code

1. Abre a pasta do projeto no VS Code.
2. Abre o terminal.
3. Instala as dependências:

```bash
npm install
```

4. Arranca o projeto:

```bash
npm run dev
```

5. O Vite vai mostrar um link local para veres o site no navegador.

## Próximos passos recomendados

### 1) Ligar reservas a backend real
Podes integrar com:
- **Supabase** para guardar pedidos;
- **Firebase** para base de dados e autenticação;
- **Google Calendar** para gestão de agenda;
- **Email / WhatsApp API** para notificações automáticas.

### 2) Melhorias visuais
- galeria antes/depois;
- animações suaves;
- página separada para cada serviço;
- integração de reviews reais;
- mapa com zonas de atuação.

### 3) Funcionalidades extra
- painel admin para gerir pedidos;
- bloqueio de horários ocupados;
- orçamento automático por tipo de serviço;
- multi-página com SEO local para Coimbra e Pombal.

## Contactos usados no projeto

- Telefone: **+351 910 879 788**
- Instagram: **@demaclean_**
- Zona: **Coimbra, Pombal e região**
