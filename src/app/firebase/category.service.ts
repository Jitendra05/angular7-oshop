import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Category } from '../models/Category';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db:AngularFireDatabase) { }


  getAll() : Observable<Category[]> {
    return this.db.list<Category>('categories').snapshotChanges().pipe(
      map(actions => 
        actions.map<Category>(a => ({ key: a.key, ...a.payload.val() })
      )));
  }
}
