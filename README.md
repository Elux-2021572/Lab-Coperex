# Lab-Coperex
Esta API permitirá a las empresas registrar sus datos, incluyendo información crucial como su nivel de impacto, años de  trayectoria y categoría empresarial. 


http://localhost:3001/coperexManagement/v1/auth/login

{
  "username": "Kernel",
  "password": "emLo06.20#"
}


http://localhost:3001/coperexManagement/v1/enterprise/registerEnterprise

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

http://localhost:3001/coperexManagement/v1/enterprise/getEnterprises

http://localhost:3001/coperexManagement/v1/enterprise/updateEnterprise/67c21dbe9722c4adc2209950
{
    "name": "Car automatic Updated",
    "description": "A company focused on transport and logistics."
}
Authorization Bearer 
Content-Type application/json

http://localhost:3001/coperexManagement/v1/enterprise/generateEnterpriseReport