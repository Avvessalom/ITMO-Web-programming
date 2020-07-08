import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent implements OnInit {
  links = [
    {url: '/laba', name: 'Лаба'},
    {url: '/var', name: 'Вариант'},
    {url: '/gey', name: 'Роман'},
    {url: '/eugene', name: 'Евгений'}
  ];
  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }
  logout(event: Event){
    event.preventDefault();
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
