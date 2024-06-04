import { Component, ViewChild } from '@angular/core';
import { StreamInvocationMessage } from '@microsoft/signalr';
import { ConfirmationModalComponent } from './confirmation-modal/confirmation-modal.component';
import { SpinnerService } from './Loader/spinner.service';
import { Iprpoerty } from './property.model';
import { SignalrService } from './signalr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Asaslive';
  isModalOpen = false;
  newStatus:any;
  landBlock:any;
  properties: Iprpoerty[];
  parentDiscription:string
  @ViewChild(ConfirmationModalComponent)
    private yesNoDialog!: ConfirmationModalComponent;
    
  constructor(private signalrService: SignalrService,
    private spinner: SpinnerService
  ) { }

  changeStatus(property: any) {
    this.landBlock=property;
     this.newStatus = this.landBlock.status === 1 ? 2 : this.landBlock.status === 2 ? 3 : 1
    if(this.newStatus==3){
    this.parentDiscription="Are you sure to mark the unit As sold?"
      //this.yesNoDialog.Show("fhfghfg");
      this.openModal();
    }else if(this.newStatus==1){
      this.parentDiscription="Are you sure to cancel the sold unit and make it available?"
      this.openModal();
    }else{
      this.landBlock.status = this.newStatus
      this.signalrService.changeLandStatus(this.landBlock.number, this.landBlock);
    }
    
  }

  ngOnInit() {
    this.spinner.show()
    this.signalrService.getAllProperties().subscribe({
      next: (data: any) => {
        this.properties = data.result;
        this.spinner.hide();
      },
      error: err => {
        console.error(err);
        this.spinner.hide();
      }
    })

    // Subscribe to real-time updates
    this.signalrService.landStatusUpdates.subscribe(update => {
      const land = this.properties?.find(p => p.number == update.number);
      if (land) {
        land.status = update.status;
      } else {

        //this.properties.push(update);
      }
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  confirmChange(){
    this.landBlock.status = this.newStatus
    this.signalrService.changeLandStatus(this.landBlock.number, this.landBlock);
    this.closeModal()
  }
}
