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
  createSub(url: string, sub: string, description: string) {
    return this.http.post(`http://localhost:3000/sub`, { url, sub, description });
  }
  isJoined(sub: string) {
    return this.http.get(`http://localhost:3000/sub/${sub}/joined`);
  }
  joinSub(sub: string) {
    return this.http.post(`http://localhost:3000/sub/${sub}/join`, {});
  }
  leaveSub(sub: string) {
    return this.http.post(`http://localhost:3000/sub/${sub}/leave`, {});
  }
  getSubs() {
    return this.http.get(`http://localhost:3000/sub`);
  }
}