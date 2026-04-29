# 🎁 Prizeasy

Aplicación fullstack de canje de productos mediante puntos.

Permite a los usuarios acumular y gastar puntos en productos, mientras que un administrador puede gestionar el sistema completo.

---

## 🚀 Demo funcional (local)

## 📦 Requisitos

- Java 17+
- Node.js 18+
- MySQL 8+

### 🔧 Backend (Spring Boot)

```bash
cd prizeasy-api
./mvnw spring-boot:run
```

### 💻 Frontend (Angular)

```bash
cd prizeasy-frontend
npm install
ng serve
```

### 🌐 URLs

* Frontend: http://localhost:4200
* Backend: http://localhost:8080

---

## 🔐 Usuarios de prueba

| Rol   | Email                                     | Password |
| ----- | ----------------------------------------- | -------- |
| USER  | [juan@email.com](mailto:juan@email.com)   | 123456   |
| ADMIN | [admin@email.com](mailto:admin@email.com) | admin123 |

---

## ✨ Features

### 👤 Usuario

* Login con JWT
* Visualización de productos
* Canje de productos por puntos
* Historial de puntos
* Historial de pedidos

### 🛠️ Admin

* CRUD de productos
* Gestión de usuarios
* Visualización de todos los pedidos
* Gestión de puntos (sumar/restar)

---

## 🧠 Tecnologías

### Frontend

* Angular (Standalone Components)
* Signals
* HttpClient
* CSS puro (sin librerías externas)

### Backend

* Spring Boot
* Spring Security + JWT
* JPA / Hibernate
* MySQL

---

## 🗄️ Base de datos

* La estructura se genera automáticamente con JPA (`ddl-auto=update`)
* Datos iniciales cargados con `data.sql`

Antes de ejecutar el backend, debes crear la base de datos en MySQL solamente la linea de abajo:

```sql
CREATE DATABASE db_prizeasy;

---

## 📁 Estructura del proyecto

```
prizeasy/
├── prizeasy-api/
└── prizeasy-frontend/
```

---

## 🎯 Objetivo del proyecto

Este proyecto fue desarrollado como parte de un portafolio para demostrar:

* Arquitectura fullstack
* Manejo de autenticación con JWT
* CRUD completo
* Integración frontend-backend
* Buenas prácticas básicas

---

## 🔮 Mejoras futuras (V2)

* Carrito de compras
* Validaciones UX más avanzadas
* Subida de imágenes (cloud storage)
* Paginación y filtros
* Mejor manejo de errores
* UI más avanzada

---

Proyecto en desarrollo 🚀

## ⚠️ Notas

* Las imágenes de productos se sirven desde el backend para simplificar el setup local y logos,etc. en frontend
* En un entorno productivo se usaría almacenamiento externo (S3/CDN)

---

## 👨‍💻 Autor

Desarrollado por **Aaron F.**
