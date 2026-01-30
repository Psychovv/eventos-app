# 📱 Internal Events App

Aplicação mobile desenvolvida com **React Native + Expo** para gerenciamento de eventos internos, consumindo uma API REST fornecida para o desafio técnico.

O app permite **listar, filtrar, visualizar detalhes, criar, atualizar status e remover eventos**, seguindo o contrato da API disponibilizada.

---

## 🚀 Tecnologias utilizadas

* **React Native**
* **Expo**
* **TypeScript**
* **Axios**
* **React Navigation (Native Stack)**

---

## 📂 Estrutura do projeto

```
src/
├─ components/      # Componentes reutilizáveis
├─ screens/         # Telas da aplicação
├─ routes/          # Configuração de navegação
├─ services/        # Comunicação com a API
├─ types/           # Tipagens TypeScript
```

Essa separação foi adotada para manter o código **organizado, legível e escalável**.

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

* Node.js (v20+ recomendado)
* Backend da API rodando localmente

### Instalação

```bash
npm install
```

### Executar o app

```bash
npx expo start
```

* Para desenvolvimento rápido, foi utilizado **Expo Web**
* O app também pode ser executado em **dispositivo físico** usando o **Expo Go**

---

## 🔌 Integração com a API

A comunicação com a API é feita via **Axios**, com uma instância centralizada:

```ts
export const api = axios.create({
  baseURL: "http://localhost:3000",
});
```

Isso facilita manutenção e evita repetição de código.

---

## 🧩 Funcionalidades implementadas

### ✅ Listar eventos

* Consome `GET /events`
* Exibe lista de eventos retornados pela API

### ✅ Filtrar eventos por título

* Filtro local em memória
* Atualização em tempo real conforme o usuário digita

### ✅ Visualizar detalhes do evento

* Navegação para tela dedicada
* Exibição de todas as informações do evento

### ✅ Atualizar status do evento

* Utiliza `PUT /events/:id`
* Opções: `PLANNED`, `CONFIRMED`, `CANCELLED`
* Feedback visual de sucesso ou erro

### ✅ Criar evento

* Tela com formulário
* Envia `POST /events`
* Validação básica dos campos

### ✅ Remover evento

* Confirmação antes da exclusão
* Chamada `DELETE /events/:id`

---

## ⚠️ Observações importantes sobre a API (MUITO IMPORTANTE)

A API fornecida para o desafio possui **limitações intencionais**, comuns em testes técnicos:

### 🔹 Persistência de dados

* As operações de **CREATE** e **DELETE** retornam sucesso (ex: `201`, `204`)
* Porém, os dados **podem não persistir** após uma nova listagem (`GET /events`)
* Esse comportamento foi confirmado via **Swagger**, não sendo um problema do front-end

### 🔹 CORS no ambiente Web

* No **Expo Web**, o navegador aplica políticas de **CORS**
* Métodos como `PATCH` e `DELETE` podem ser bloqueados
* Por esse motivo:

  * Foi utilizado **PUT** no lugar de PATCH
  * As funcionalidades funcionam normalmente em ambientes sem CORS (Swagger / Mobile)

> Essas limitações foram respeitadas para não alterar o backend fornecido no desafio.

---

## 🧠 Decisões técnicas

* **PUT em vez de PATCH**
  A API aceita PUT e o método é permitido no CORS do ambiente web.

* **Filtro local em memória**
  Simples, performático e suficiente para o escopo do desafio.

* **Estados separados para ações (update/delete)**
  Evita bloqueio indevido de botões e melhora a UX.

* **Recarregar lista ao voltar de outras telas**
  Utilizando `useFocusEffect` para manter dados atualizados.

---

## 📌 Considerações finais

O foco do projeto foi:

* Clareza de código
* Boa organização
* Uso correto do TypeScript
* Respeito ao contrato da API
* Implementação completa do CRUD

Mesmo com as limitações da API de teste, todas as funcionalidades solicitadas foram implementadas corretamente.
