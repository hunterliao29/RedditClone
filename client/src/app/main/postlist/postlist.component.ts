import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { SubService } from 'src/app/services/sub.service';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.scss']
})
export class PostlistComponent implements OnInit {
  @Input() post!: {
    _id: string,
    by: string,
    sub: string,
    title: string,
    time: number,
    votes: {
      up: number,
      down: number
    }, message: string
  };
  nexts!: [{
    _id: string,
    by: string,
    sub: string,
    title: string,
    time: number,
    votes: {
      up: number,
      down: number
    }, message: string
  }];

  show = false;
  message: string = '';

  constructor(private router: Router, public authService: AuthService, private postService: PostService, private subService: SubService) { }

  time: string = ""
  sub: string = ""

  ngOnInit(): void {


    setTimeout(() => {
      if (this.post) {

        this.authService.getName(this.post.by).subscribe((data: any) => {
          this.post.by = data.name;
          this.time = this.timeSince(new Date(this.post.time));
        })

        this.subService.getSub(this.sub).subscribe((data: any) => {
          this.sub = data.subs[0].url

          
          
        })


        this.postService.childPosts(this.post._id).subscribe((data: any) => {
          console.log("here1");
          console.log(data.posts);
          
          
          this.nexts = data.posts;
        })
      }
    }, 200)
  }
  // DIFFERENT DIFFERNET IN MINUTES FORM NOW
  timeSince(arg0: Date): any {
    let now = new Date();
    let seconds = Math.floor((now.getTime() - arg0.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " years";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " months";
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";

  }

  showComments() {
    this.show = !this.show;
  }

  send(id: string, message: string) {
    if (message) {
      this.postService.postMessage(id, message).subscribe((data: any) => {
        this.message = '';
        this.postService.childPosts(this.post._id).subscribe((data: any) => {
          this.nexts = data.posts;
        })

      }
      )
    }
  }
  upvote(id: string) {
    this.postService.upvoteMessage(id).subscribe((data: any) => {
      this.post.votes = data.votes;
    })
  }
  downvote(id: string) {
    this.postService.downvoteMessage(id).subscribe((data: any) => {
      this.post.votes = data.votes;
    })
  }
  goSub() {
    this.router.navigate([`r/${this.sub}`])
  }
}
