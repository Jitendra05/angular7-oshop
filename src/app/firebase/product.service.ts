import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Product } from '../models/product';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('products').snapshotChanges().pipe(
      map(actions => 
        actions.map<Product>(a => ({key:a.key, ...a.payload.val() })
      )));
  }

  get(id:string): Observable<Product> {
    return <any>this.db.object('/products/'+id).valueChanges();
  }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(id:string, product) {
   return this.db.object('/products/'+id).update(product);
  }

  delete(id:string) {
      return this.db.object('/products/'+id).remove();
   }
}
