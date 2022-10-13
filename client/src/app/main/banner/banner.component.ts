import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SubService } from 'src/app/services/sub.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() sub!: {
    url: string,
    name: string,
    description: string
  };



  joined = "Join";
  constructor(private router: Router, private authService: AuthService, public subService: SubService) { }

  ngOnInit(): void {
    if (this.authService.isLogIn) {
      this.subService.isJoined(this.sub.url).subscribe((data: any) => {
        this.joined = data.joined;
      })
    }
  }

  click() {
    if (!this.authService.isLogIn) {
      this.router.navigate(['/login']);
    }
    else if (this.joined == "Join") {

      
      this.subService.joinSub(this.sub.url).subscribe((data: any) => {
        this.joined = data.joined;
      })
    }
    else {

      this.subService.leaveSub(this.sub.url).subscribe((data: any) => {
        this.joined = data.joined;
      })
    }
  }
}