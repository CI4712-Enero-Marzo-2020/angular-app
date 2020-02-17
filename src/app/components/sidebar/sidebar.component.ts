import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/users/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
// Agregar información de iconos del sidebar con rutas aquí
export const ROUTES_NOT_LOGGIN: RouteInfo[] = [
  { path: '/login', title: 'Login',  icon:'person', class: '' }
];

// Agregar información de iconos del sidebar con rutas aquí
export const ROUTES: RouteInfo[] = [
    { path: '/projects', title: 'Portafolio de Proyectos',  icon:'dashboard', class: '' },
    { path: '/create-users', title: "Perfiles de Usuarios", icon: "person", class: ''}
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  menuItems_not_login:any[];

  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.menuItems_not_login = ROUTES_NOT_LOGGIN.filter(menuItems=>menuItems);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
