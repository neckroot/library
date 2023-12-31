import { inject, Injectable } from '@angular/core';
import { DataService } from './data.service';
import { BehaviorSubject } from 'rxjs';
import { Author } from '../authors/author.model';
import { TableService } from './table.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorService {
  private _dataService = inject(DataService);
  private _tableService = inject(TableService);
  private _localBooks: Array<Author> = this._dataService.getData('authors');

  private _authors$ = new BehaviorSubject(this._localBooks);

  public get authors$() {
    return this._tableService.sortTable('lastname', this._authors$);
  }

  public addAuthor(formData: Author) {
    if (this._isExist(formData)) return;

    const newData = this._dataService.getDataWithID('authors', formData);
    this._authors$.next([...this._authors$.value, newData]);
    this._dataService.saveDataToLocalStore('authors', this._authors$.value);
  }

  private _isExist(data: Author) {
    return this._authors$.value.some(
      (author) =>
        author.firstname === data.firstname &&
        author.lastname === data.lastname &&
        author.patronymic === data.patronymic &&
        author.birthdate === data.birthdate,
    );
  }
  // private _isExist(data: Author) {
  //     return this._authors$.value.some((author) => {
  //       const authors = JSON.stringify(
  //         Object.fromEntries(
  //           Object.entries(author).filter((prop) => prop[0] != 'id'),
  //         ),
  //       );
  //       return authors === JSON.stringify(data);
  //     });
  //   }
}
