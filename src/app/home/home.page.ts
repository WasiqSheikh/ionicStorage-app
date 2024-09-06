import { Component, input } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageServiceService } from '../Services/storage-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  userid = input.required<string>();
  username: string = '';
  email: string = '';
  id: any;
  getAllKeysValuePairs: any = []
  constructor(private storageService: StorageServiceService, private router: Router) { }

  async ngOnInit() {


    await this.storageService.init();
    if (this.userid() !== null) {
      console.log('ok');
      let data = await this.storageService.getDetailsbyId(this.userid());
      console.log('data = ', data);
      this.username = data[0].username;
      this.email = data[0].email;


    }
    else {
      const allValues = await this.storageService.getAll();
      console.log(allValues);
      // console.log('after removing one key = ', await this.storageService.getAll());
    }
  }

  async Submit() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;

    // Generate a random string of 6 characters
    const randomStr = Math.random().toString(36).substr(2, 6);

    // Combine the date-time and random string
    this.id = `${dateTime}_${randomStr}`;
    let data = {
      username: this.username,
      email: this.email,
      id: this.id
    }
    await this.storageService.createUser(data).then(() => {
      this.router.navigate(['getall']);
    });
  }

  async Update() {
    let data = {
      username: this.username,
      email: this.email,
      id: this.userid()
    }

    await this.storageService.UpdateData(data);
    this.router.navigate(['getall']);
  }
}
