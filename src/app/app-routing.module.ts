import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { ErrorComponent } from './error/error.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipeResolverService } from './recipes/recipe-resolver.service';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipesResolverService } from './recipes/recipes-resolver.service';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    component: RecipesComponent,
    resolve: {
      recipes: RecipesResolverService,
    },
    children: [
      { path: '', component: RecipeStartComponent },
      {
        path: 'new',
        component: RecipeEditComponent,
        data: { message: 'Add New Recipe' },
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {
          recipe: RecipeResolverService,
          recipes: RecipesResolverService,
        },
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        resolve: {
          recipe: RecipeResolverService,
          recipes: RecipesResolverService,
        },
        data: { message: 'Edit This Recipe' },
      },
    ],
  },
  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent },
  {
    path: 'not-found',
    component: ErrorComponent,
    data: { message: 'Page Not Found!' },
  },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
