import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SubService } from '../services/sub.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  constructor(private router: Router, private subService: SubService, private activatedRoute: ActivatedRoute) { }

  message = ""
  url = ""

  createForm = new FormGroup({
    url: new FormControl(this.url, [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required])
  });

  onSubmit() {
    const { url, name, description } = this.createForm.getRawValue();
    if (!url || !name || !description) {
      this.message = "Please enter url, name and description"
      return
    }
    this.subService.createSub(url, name, description).subscribe((res: any) => {

      setTimeout(() => { this.router.navigate([`/r/${url}`]); }, 200)
    }, (err) => {
      this.message = err
    });
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.url = params['sub']
    })
  }

}
