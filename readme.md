````md
# 📱 Internal Events App

Aplicação mobile desenvolvida com **React Native + Expo** para gerenciamento de eventos corporativos, consumindo uma API REST disponível no repositório  
https://github.com/MatheusAndrade23/internal-events-api

---

## 🚀 Tecnologias

- React Native
- Expo
- TypeScript
- Axios
- React Navigation (Native Stack)
- Zod

---

## ✅ Funcionalidades Implementadas

- Listagem de eventos
- Visualização de detalhes do evento
- Criação de eventos
- Atualização de status do evento
- Exclusão de eventos
- Filtro de eventos por título

---

## 🔐 Validação de Dados

- Validação de formulário implementada com **Zod**
- Regras centralizadas em schemas
- Feedback visual por campo (input destacado em vermelho e mensagem de erro)
- Normalização de datas para formato ISO antes do envio para a API

---

## ⚙️ Como Rodar o Projeto

### Pré-requisitos

- Node.js
- Git
- API do desafio rodando localmente

---

### 1️⃣ Clonar o repositório do frontend

```bash
git clone https://github.com/Psychovv/internal-events-app.git
cd internal-events-app
````

---

### 2️⃣ Clonar o repositório da API

```bash
git clone https://github.com/MatheusAndrade23/internal-events-api.git
cd internal-events-api
```

---

### 3️⃣ Instalar dependências e rodar a API

```bash
npm install
npm run dev
```

A API estará disponível, por padrão, em:

```
http://localhost:3000
```

---

### 4️⃣ Configurar a URL da API no frontend

No arquivo:

```
src/services/api.ts
```

Verifique se a `baseURL` está apontando para a API local:

```ts
baseURL: "http://localhost:3000"
```

---

### 5️⃣ Instalar dependências do frontend

Voltando para a pasta do frontend:

```bash
npm install
```

---

### 6️⃣ Executar o projeto

```bash
npx expo start
```

O projeto pode ser executado em:

* emulador Android
* simulador iOS
* navegador (Expo Web)

---

```

