import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class PostService {


  filterSubject = new BehaviorSubject(this.cookieService.get("filter")||"New")

  constructor(private http: HttpClient, private cookieService: CookieService) {
    this.filterSubject.subscribe(a => {
      this.cookieService.set("filter", a)
    })
  }

  getPosts(sub: string) {
    return this.http.get(`http://localhost:3000/post/${sub}`);
  }
  getHomePosts() {
    return this.http.get(`http://localhost:3000/post/home`);
  }
  postPost(sub: string, title: string, message: string) {
    return this.http.post(`http://localhost:3000/post`, { sub, title, message });
  }
  childPosts(id: string) {
    return this.http.get(`http://localhost:3000/post/child/${id}`);
  }

  postMessage(id: string, message: string) {
    return this.http.post(`http://localhost:3000/post/child/${id}`, { message });
  }
  upvoteMessage(id: string) {
    return this.http.put(`http://localhost:3000/post/upvote/${id}`, {});
  }
  downvoteMessage(id: string) {
    return this.http.put(`http://localhost:3000/post/downvote/${id}`, {});
  }

  changeFilter(method: string) {
    this.filterSubject.next(method)
  }
}
