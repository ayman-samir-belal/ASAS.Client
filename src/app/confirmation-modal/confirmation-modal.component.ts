import { Component, EventEmitter, Input, Output } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrl: './confirmation-modal.component.scss'
})
export class ConfirmationModalComponent {

    @Input() yesNoDialogId?: string;
    @Input() title?: string;
    @Input() text?: string;
    @Input() description?: string;
    @Input() item?: any;
    @Input() showCommentField?: boolean;
    //@Input() confirm: string = 'confirm';
    @Input() cancel: string = 'cancel';

  @Output() close = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }
   confirmModal() {
    this.confirm.emit();
  }

  onOverlayClick(event: MouseEvent): void {
    this.closeModal();
  }

}
