import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  constructor(public postService: PostService) { }
  isSelect!: string

  ngOnInit(): void {
    this.postService.filterSubject.subscribe(a => {
      this.isSelect = a
      console.log(a);
      
    })
  }

  change(method: string) {
    this.postService.filterSubject.next(method)
  }

}
