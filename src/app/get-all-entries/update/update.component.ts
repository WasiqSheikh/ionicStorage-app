import { Component, Input, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'],
})
export class UpdateComponent  implements OnInit {

  constructor() { }

  @Input() data: any;
  ngOnInit() {
  }

  updateUserDetails() {

  }
}
