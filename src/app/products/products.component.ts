import { Component, OnInit } from '@angular/core';
import { ProductService } from '../firebase/product.service';
import { CategoryService } from '../firebase/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$;
  categories$;
  category;

  constructor(
    private route:ActivatedRoute,
    private categoryService:CategoryService,
    private productService:ProductService) {
      this.route.queryParamMap.subscribe((params)=>{
        this.category = params.get('category');
      });
     }

  ngOnInit() {
    this.products$ = this.productService.getAll();
    this.categories$ = this.categoryService.getAll();
  }

}
