import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubService } from '../services/sub.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  sub!: {
    url: string,
    name: string,
    description: string
  }
  posts!: [{
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

  constructor(private postService: PostService, public authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute, private subService: SubService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['sub'] == undefined) {
        this.postService.getHomePosts().subscribe((data: any) => {
          this.posts = data.posts;
        })
        return
      }
      this.subService.getSub(params['sub']).subscribe((data: any) => {
        if (data.sub == undefined) {
          this.router.navigate(['/create', params['sub']]);
          return;
        }
        this.sub = data.sub;
        this.postService.getPosts(this.sub.url).subscribe((data: any) => {
          this.posts = data.posts;
        })
      })
    })

    setTimeout(() => {
      this.postService.filterSubject.subscribe(a => {
        this.posts = this.sortPost(this.posts)
      })
    }, 200)


  }

  sortPost(posts: [{
    _id: string,
    by: string,
    sub: string,
    title: string,
    time: number,
    votes: {
      up: number,
      down: number
    }, message: string
  }]) {
    if(!posts) return posts
    if (this.postService.filterSubject.getValue() == 'New') {
      return posts.sort((a, b) => {
        console.log(b.time);

        return b.time - a.time})
    }
    if (this.postService.filterSubject.getValue() == 'Old') {
      return posts.sort((a, b) => a.time - b.time)
    }
    if (this.postService.filterSubject.getValue() == 'Up') {
      return posts.sort((a, b) => b.votes.up - a.votes.up)
    }
    if (this.postService.filterSubject.getValue() == 'Down') {
      return posts.sort((a, b) => b.votes.down - a.votes.down)
    }
    if (this.postService.filterSubject.getValue() == 'Popular') {
      return posts.sort((a, b) => (b.votes.up - b.votes.down) - (a.votes.up - a.votes.down))
    }
    return posts
  }
}
