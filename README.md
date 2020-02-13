# angular-app

# Requerimientos

Angular CLI: 8.3.23
Node: 10.16.0  
Angular: 8.2.14  
npm: 6.9.0

Instalación

    git clone https://github.com/CI4712-Enero-Marzo-2020/angular-app.git
    cd angular-app
    npm install
    ng serve

Acuerdos de desarrollo

### Services
  Crear los servicios necesarios por módulo siguiendo el siguiente formato:

  ng generate service services/modulo/nombre de servicio 

    ejemplo:  ng generate service services/logger/logger

### Layout
  Los nuevos componentes agregados a la aplicación deben ser registrados en el layout
  y agregados al sidebar en los archivos:

  admin-layout.module.ts
  admin-layout.routing.ts
  sidebar.component.ts

  conforme indican los comentarios.