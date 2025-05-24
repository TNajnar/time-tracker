import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from "@angular/material/form-field";

@Component({
  selector: 'app-add-project-dialog',
  templateUrl: 'add-project-dialog.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})
export class AddProjectDialogComponent {
  private readonly _dialogRef = inject(MatDialogRef<AddProjectDialogComponent>);

  readonly newProject = signal<string>('');

  onClose(): void {
    this._dialogRef.close();
  }
}
