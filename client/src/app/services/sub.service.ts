import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubService {

  constructor(private http: HttpClient) { }

  getSub(sub: string) {
    return this.http.get(`http://localhost:3000/sub/${sub}`);
  }
  getSubName(id: string) {
    return this.http.get(`http://localhost:3000/sub/name/${id}`);
  }
  createSub(url: string, sub: string, description: string) {
    return this.http.post(`http://localhost:3000/sub`, { url, sub, description });
  }
  isJoined(sub: string) {
    return this.http.get(`http://localhost:3000/sub/joined/${sub}`);
  }
  joinSub(sub: string) {
    return this.http.post(`http://localhost:3000/sub/join/${sub}`, {});
  }
  leaveSub(sub: string) {
    return this.http.post(`http://localhost:3000/sub/leave/${sub}`, {});
  }
  getSubs() {
    return this.http.get(`http://localhost:3000/sub`);
  }
}
