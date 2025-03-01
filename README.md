# 🚀 Lab-Coperex API

Lab-Coperex es una API que permite a las empresas registrar sus datos, incluyendo información clave como su nivel de impacto, años de trayectoria y categoría empresarial.

## 📌 Requisitos previos

Asegúrate de tener instalado lo siguiente en tu sistema:
- [Node.js](https://nodejs.org/)
- [Postman](https://www.postman.com/) (opcional, pero recomendado para pruebas)

## Instalación

1. Clona este repositorio:
   ```sh
   git clone https://github.com/tu-repo/lab-coperex.git
   ```
2. Accede al directorio del proyecto:
   ```sh
   cd lab-coperex
   ```
3. Instala las dependencias necesarias:
   ```sh
   npm install
   ```

## ⚡ Uso

### Autenticación
Para autenticarse en la API, usa el endpoint:
```
POST http://localhost:3001/coperexManagement/v1/auth/login
```
Body:
```json
{
  "username": "Kernel",
  "password": "emLo06.20#"
}
```

### Registro de Empresas
Para registrar una empresa, usa el endpoint:
```
POST http://localhost:3001/coperexManagement/v1/enterprise/registerEnterprise
```
Body:
```json
{
    "name": "Tech Innovators",
    "description": "A company focused on innovation and technology.",
    "category": "Education",
    "address": "123 Tech St, Silicon Valley",
    "phone": "1234567890",
    "email": "contact@techinnovators.com",
    "impactLevel": "HIGH",
    "yearFoundation": "2005-06-15"
}
```

### Listar Empresas
```
GET http://localhost:3001/coperexManagement/v1/enterprise/getEnterprises
```

### Actualizar Empresa
```
PUT http://localhost:3001/coperexManagement/v1/enterprise/updateEnterprise/{enterpriseId}
```
Body:
```json
{
    "name": "Car automatic Updated",
    "description": "A company focused on transport and logistics."
}
```

### Generar Reporte en Excel
```
GET http://localhost:3001/coperexManagement/v1/enterprise/generateEnterprise/Report
```

### 🔄 Ordenar Empresas
- Ordenar A-Z:
  ```
  GET http://localhost:3001/coperexManagement/v1/enterprise/getEnterprisesByOrder?order=A-Z
  ```
- Ordenar Z-A:
  ```
  GET http://localhost:3001/coperexManagement/v1/enterprise/getEnterprisesByOrder?order=Z-A
  ```
- Filtrar por categoría:
  ```
  GET http://localhost:3001/coperexManagement/v1/enterprise/getEnterprisesByCategory/{category}
  ```

## 🛠️ Tecnologías utilizadas
- Node.js
- Express
- MongoDB
- JSON Web Tokens (JWT)

## Contacto
Para cualquier consulta o reporte de problemas, contacta con el equipo de desarrollo en elux-2021572@kinal.edu.gt 


