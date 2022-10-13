import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  @Input() sub!: {
    url: string,
    name: string,
    description: string
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  nav() {
    this.router.navigate(['/post'])
  }
}
