import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { CategoryService } from 'src/app/firebase/category.service';
import { Category } from 'src/app/models/Category';
import { ProductService } from 'src/app/firebase/product.service';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  @Input('product') product:Product={
    key:'',
    title:'',
    price:0,
    category:'',
    imageUrl:''
  };
  @Input('id') id;

  constructor (
      private router:Router,
      private productService:ProductService,
      private categoryService: CategoryService
    ) { 
      this.categories$ = this.categoryService.getAll();
  }

  ngOnInit() {}

  submit(product) {
    if(this.id) this.productService.update(this.id,product).then(()=>{});
    else this.productService.create(product).then(()=>{});
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if(!confirm('Are you sure, you want to remove this product!')) return;

    this.productService.delete(this.id).then(()=>{
      this.router.navigate(['/admin/products']);
    });
  }

}
