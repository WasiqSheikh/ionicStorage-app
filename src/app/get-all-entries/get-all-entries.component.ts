import { Component, OnInit } from '@angular/core';
import { StorageServiceService } from '../Services/storage-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UpdateComponent } from './update/update.component';
import { HomePage } from '../home/home.page';

@Component({
  selector: 'app-GetAllEntries',
  templateUrl: './get-all-entries.component.html',
  styleUrls: ['./get-all-entries.component.scss']
})
export class GetAllEntriesComponent implements OnInit {
  getAllEntries: any = [];
  getFormDataEntries: any = [];
  constructor(private storageService: StorageServiceService, private router: Router, private activatedRoute: ActivatedRoute, private modalController: ModalController) { }

  async ngOnInit() {
    await this.storageService.init()
    this.getAllEntries = await this.storageService.getAll();
    this.getAllEntries.filter((entry: any) => {
      if(entry.key === 'formData') {
        this.getFormDataEntries = entry.value;
      }
    })
    console.log('getFormDataEntries = ',this.getFormDataEntries);
  }

  async update(key: any) {
    this.router.navigate(['home',key]);
    // const modal = await this.modalController.create({
    //   component: HomePage,
    //   componentProps: {
    //     data
    //   }
    // })
    // modal.present();
  }
}
