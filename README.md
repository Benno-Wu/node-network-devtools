<div align="center">
  <h1 align="center">
    <img src="https://github.com/GrinZero/extreme/assets/70185413/415b35ca-6e28-4486-b480-459bda8f1faa" width="100" />
    <br>Node Network Devtools</h1>

 <h3 align="center">🔮  Use chrome network devtool to debugger nodejs</h3>
 <h3 align="center">🦎  Similar web crawler experience to browsers </h3>
 <h3 align="center">⚙️  Powered by CDP</h3>
  <p align="center">
  <p align="center">
     <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" alt="NodeJs"/>
    <img src="https://img.shields.io/badge/Google%20Chrome-4285F4?style=for-the-badge&logo=GoogleChrome&logoColor=white" alt="Chrome"/>
   <img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white" alt="TypeScript" />
 </p>
 </p>

</div>

---

English | [简体中文](README-zh_CN.md)

## 📖 Introduction

As you can see, the node program opened with the '-- inspect' option does not support network tags because it does not proxy user requests.
Node network devtools is designed to address this issue by allowing you to debug requests made by nodejs using the network tab of Chrome devtools, making the debugging process equivalent to a web crawler experience in the browser.

## 🎮 TODO

- [x] HTTP/HTTPS
  - [x] req/res headers
  - [x] payload
  - [x] json str response body
  - [x] binary response body
  - [x] stack follow
    - [x] show stack
    - [ ] click to jump
- [ ] WebSocket
  - [ ] messages
  - [ ] payload
  - [ ] ...
- [ ] Compatibility
  - [x] commonjs
  - [x] esmodule

## 👀 Preview

![img](https://github.com/GrinZero/extreme/assets/70185413/24de6b48-8f5e-4cf4-aff0-23f4735a4b57)

## 📦 Quick Start

### 1. Install

```bash
# npm
npm install node-network-devtools -D
# or pnpm
pnpm add node-network-devtools -D
# or yarn
yarn add node-network-devtools -D
```

### 2. Config

Add this code to your `.gitignore` file.

```bash
request-center.lock
```

### 2. Usage

Just add the following code to the entry file of your project.

```typescript
import { register } from 'node-network-devtools'

process.env.NODE_ENV === 'development' && register()
```

## 📚 Documentation

If you encounter any problems, you can try cleaning the `request-center.lock` file

![Visitors](https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fgithub.com%2FGrinZero%2Fnode-network-devtools&labelColor=%237fa1f7&countColor=%23697689)
