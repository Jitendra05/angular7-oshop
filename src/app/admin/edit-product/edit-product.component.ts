import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/firebase/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  id;
  product={};
  constructor(
    private route:ActivatedRoute,
    private productService:ProductService) { 
     this.id = this.route.snapshot.paramMap.get('id');
     console.log(this.id);
     this.productService.get(this.id).subscribe(product=>this.product=product);
    }

  ngOnInit() {
  }

}
