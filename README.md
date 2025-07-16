# 📍 App Monitoramento

Um aplicativo mobile em **React Native** com **Expo** para rastreamento e monitoramento em tempo real. O app fornece recursos de rastreamento de localização, visualização de rotas.

---

## 📱 Descrição

Este aplicativo foi desenvolvido para empresas de transporte com o objetivo de monitorar motoristas/pilotos. Ele oferece:

- Rastreamento GPS em tempo real com atualização em segundo plano
- Visualização da rota no Google Maps
- Histórico de rotas com filtros
- Armazenamento offline de coordenadas (quando sem rede)
- Notificações push sobre o status do rastreamento
- Autenticação baseada em JWT

---

## 🛠️ Tech Stack

- **React Native** 0.79.2
- **Expo SDK** 53.0.9
- **TypeScript** 5.3.3
- **Styled Components** 6.1.17
- **React Navigation** 7.x

---

## 📦 Principais Bibliotecas

### Core

- `@react-navigation/native`, `@react-navigation/native-stack` - Navegação
- `expo-location` - Serviços de localização
- `expo-task-manager` - Tarefas em segundo plano
- `expo-background-task` - Processamento em background
- `expo-notifications` - Notificações push
- `react-native-maps` - Google Maps
- `@react-native-async-storage/async-storage` - Armazenamento local
- `axios` - Cliente HTTP
- `jwt-decode` - Decodificação de JWT
- `@react-native-community/netinfo` - Detecção de conectividade

### UI e Estilo

- `styled-components` - CSS-in-JS
- `react-native-responsive-fontsize` - Tamanho de fonte responsivo
- `react-native-safe-area-context` - Safe area
- `@expo/vector-icons` - Biblioteca de ícones

---

## 🚧 Status do Projeto

### ✅ Implementado
- [x] Interface de usuário responsiva
- [x] Navegação entre telas
- [x] Rastreamento GPS em tempo real
- [x] Processamento em segundo plano
- [x] Coleta automática de coordenadas
- [x] Filtro de distância mínima
- [x] Visualização no Google Maps
- [x] Armazenamento offline básico (AsyncStorage)
- [x] Sistema de notificações
- [x] Autenticação JWT (mobile)
- [x] Decodificação, Armazenamento e expiração de token
- [x] Detecção de conectividade

### 🔄 Em Desenvolvimento
- [ ] **Backend API** - Serviços de autenticação e sincronização
- [ ] **React Hook Form + Yup** - Migração da validação de formulários
- [ ] **SQLite Local Database** - Implementação de banco offline-first
- [ ] **Sincronização de dados** - Estratégia offline-first com sync
- [ ] **Testes unitários** - Cobertura de componentes críticos

### 📝 Mudanças Planejadas
- Substituir validação manual por **React Hook Form** + **Yup**
- Migrar AsyncStorage para **SQLite** com **expo-sqlite**
- Implementar padrão **offline-first** com sincronização automática
- Adicionar queue de sincronização para dados pendentes

## 🚀 Processo de Instalação

### 📋 Pré-requisitos

- Node.js (v16+)
- Expo CLI (`npm install -g expo-cli`)
- Android Studio ou depuração USB habilitada no dispositivo Android

### 1. Clone o repositório

```bash
git clone <repository-url>
cd app-rastreamento
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure a chave da API do Google Maps
```bash
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "SUA_CHAVE_DO_GOOGLE_MAPS"
        }
      }
    }
  }
}
```

### Para obter uma chave:

* Acesse o Google Cloud Console

* Crie um projeto ou selecione um existente

* Ative a API Maps SDK for Android

* Gere uma API Key

* Restrinja a chave para apps Android (recomendado)

##### Nota: Certifique-se de configurar sua chave da API do Google Maps antes de rodar o aplicativo. Sem ela, o mapa e a localização não funcionarão corretamente.

### 4. Configure o Build de Desenvolvimento
- ⚠️ Este projeto exige build de desenvolvimento, pois utiliza bibliotecas que não funcionam no Expo Go (ex: notificações e tarefas em segundo plano).

```bash
npm install -g eas-cli
npx expo prebuild
npx expo run:android
```

## 📁 Estrutura de Pastas
```bash
app-rastreamento/
├── assets/                      # Arquivos estáticos
│   ├── images/logo/             # Logos
│   ├── icon.png                 # Ícone do app
│   └── splash-icon.png          # Splash screen
├── src/
│   ├── components/              # Componentes reutilizáveis
│   ├── Provider/                # Contextos globais (Auth, Font, GPS)
│   ├── routes/                  # Configuração de navegação
│   ├── screens/                 # Telas principais
│   ├── types/                   # Tipagens TypeScript
│   └── utils/                   # Funções utilitárias
├── app.json                     # Configuração do Expo
├── eas.json                     # Configuração de builds
├── package.json                 # Dependências
└── tsconfig.json                # Configuração TypeScript
```

## 📜 Scripts Disponíveis

```bash
npm start          # Inicia o servidor de desenvolvimento
npm run android    # Executa no Android
npm run ios        # Executa no iOS (macOS)
npm run clean-rebuild   # Remove android/ios e refaz
npm run start-fresh     # Clean + Rebuild + Run
```

## 🔑 Permissões Necessárias
* Android
* ACCESS_FINE_LOCATION

* ACCESS_COARSE_LOCATION

* ACCESS_BACKGROUND_LOCATION

* FOREGROUND_SERVICE

* INTERNET
