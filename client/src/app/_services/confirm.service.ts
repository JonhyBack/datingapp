import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  bsModalRef!: BsModalRef;

  constructor(private modalService: BsModalService) {}

  confirm(
    title: string = 'Confirmation',
    message: string = 'Are you sure you want to do this?',
    btnOkText: string = 'Ok',
    btnCancelText = 'Cancel'
  ): Observable<boolean> {
    const config = {
      initialState: {
        title,
        message,
        btnOkText,
        btnCancelText,
      },
    };

    this.bsModalRef = this.modalService.show(ConfirmDialogComponent, config);

    return new Observable<boolean>(this.getResult());
  }

  private getResult() {
    return (observe: any) => {
      const subscription = this.bsModalRef.onHidden?.subscribe(() => {
        observe.next(this.bsModalRef.content.result);
        observe.complete();
      });

      return {
        unsubscribe() {
          subscription!.unsubscribe();
        },
      };
    };
  }
}
