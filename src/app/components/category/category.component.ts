import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '../../model';
import { CategoryService } from '../../services';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  public categories$: Observable<Category[]>;

  constructor (private categoryService: CategoryService) { }

  ngOnInit() {
    this.categories$ = this.categoryService.getCategories();
  }
}
