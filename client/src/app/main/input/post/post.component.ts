import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/services/post.service';
import { SubService } from 'src/app/services/sub.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  message = ""
  subs!: [{
    id: string,
    url: string,
  }];
  constructor(private router: Router, private subService: SubService, private postService: PostService) { }
  sub = ""
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.subService.getSubs().subscribe((res: any) => {
      this.subs = res.subs;
    })

  }
  onSubmit() {
    const {title, message, } = this.postForm.getRawValue();
    console.log(title, message, this.sub);

    if (!title || !message || !this.sub) {
      this.message = "Please enter title, message and sub"
      return
    }
    this.postService.postPost(this.sub,title, message, ).subscribe((res: any) => {
      console.log(res.message);
      if (res.message == "Post created.") {
        this.router.navigate([`/r/${this.subs.find((sub: any) => sub.id == this.sub)?.url}`]);
        return;
      }
      this.message = res.error
      
      
    });
  }
  onChange(event: any) {
    this.sub = event.target.value;
    console.log(this.sub);
    
  }

}
