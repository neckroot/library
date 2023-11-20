import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { TableComponent } from '../table/table.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthorService } from '../services/author.service';
import { Author } from './author.model';
import { AuthorModel } from './author.model';
import { TableService } from '../services/table.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  standalone: true,
  imports: [TableComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorsComponent {
  private _authorService = inject(AuthorService);
  private _tableService = inject(TableService);
  public fields = AuthorModel.slice(1);

  public profileForm = new FormGroup({
    lastname: new FormControl('', Validators.required),
    firstname: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
    birthdate: new FormControl('', [
      Validators.required,
      // Validators.pattern(/^\d{2}\.\d{2}\.\d{4}$/),
    ]),
  });

  public tableColumnNames = this._tableService.takeFromModel(
    AuthorModel,
    'label',
  );

  public authorList$ = this._authorService.authors$;
  addAuthor() {
    this._authorService.addAuthor(<Author>this.profileForm.value);
    this.profileForm.reset();
  }
}
