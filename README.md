# 🧪 Alcodist Lab: Distributed Engine & Backend Playground
**High-Concurrency Monorepo Architecture // Business Logic Sandbox**

![NestJS](https://img.shields.io/badge/Framework-NestJS_Monorepo-E0234E?style=for-the-badge&logo=nestjs)
![Architecture](https://img.shields.io/badge/Pattern-Microservices_|_TCP_Gateway-blue?style=for-the-badge)
![Docker](https://img.shields.io/badge/Infra-Docker_Compose-2496ED?style=for-the-badge&logo=docker)

## 📌 Executive Summary
**Alcodist Lab** is my primary engineering playground for architecting, testing, and refining complex backend systems. It is a **NestJS Monorepo** designed to move away from monolithic constraints, focusing instead on **TCP-driven microservices** and decoupled business logic.

This repository serves as a sandbox for implementing high-stakes backend patterns, including distributed state, protocol translation, and containerized orchestration.

---

## 🏗️ The Playground Architecture

### 1. 📂 Monorepo Structure (`apps/`)
The Lab is divided into specialized nodes to ensure total separation of concerns:
* **The Gateway:** The traffic orchestrator. It acts as the public-facing entry point, translating HTTP requests into internal microservice commands.
* **Microservices:** Dedicated silos for heavy-duty business logic. These run independently and communicate with the Gateway over a high-speed internal TCP bridge.

### 2. 📡 Internal Communication (TCP Protocol)
* **Zero-Overhead Messaging:** Unlike standard REST-to-REST communication, the Lab utilizes **Transport.TCP** for lightning-fast, binary-efficient data transfer between services.
* **Service Discovery:** Built-in NestJS microservice patterns for managing distributed node connectivity.

### 3. 🛡️ Shared Core (`libs/common/`)
A centralized library used to enforce architectural standards across the entire playground:
* **Type Safety:** Shared DTOs and interfaces to ensure the Gateway and Services remain in sync.
* **Logic Reusability:** Common interceptors, decorators, and logging utilities.

---

## 🛠️ Engineering Tech Stack
* **Runtime:** Node.js (LTS)
* **Framework:** NestJS (Modular Monorepo)
* **Language:** TypeScript (Strict Type-Checking)
* **Orchestration:** **Docker Compose** for managing the full lifecycle of the Gateway and Service containers.
* **Validation:** Custom `test-gateway.sh` shell scripts for automated telemetry and connectivity testing.

---

## 🚀 Orchestrating the Lab
The environment is designed to be spun up as a complete cluster:

```bash
# Clone the Playground
git clone [https://github.com/Victormuthomi/alcodist-lab-new.git](https://github.com/Victormuthomi/alcodist-lab-new.git)

# Install Core Dependencies
npm install

# Build and Launch the Microservices Cluster
docker-compose up --build

# Execute Gateway Connectivity Tests
./test-gateway.sh
```
## 🔒 Philosophy: "Fail Fast, Scale Hard"

* **Service Isolation:** Every piece of business logic is containerized. If a service fails during a "playground test," the rest of the cluster remains operational.
* **Protocol Hardening:** Testing the boundaries of **TCP-based communication** to ensure maximum throughput for real-time telemetry and data processing.

---
**© 2026 ALCODIST_LABS_RND.** // *Experimental Systems & Backend Mastery.*
