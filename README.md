Step1: Create a New Angular Application:
ng new my-angular-app
Step 2: Navigate into the app directory:
cd my-angular-app
Step 3: Run the Application
ng serve
Step 4: Create a New Component
ng generate component components/dashboard
Replace the content of app.component.html with:
<app-dashboard></app-dashboard>
Step 5: Add Navigation and Routing:
Open app-routing.module.ts:
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
{ path: 'dashboard', component: DashboardComponent },
];

@NgModule({
imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule {}

Add a navigation bar in app.component.html:

<nav>
  <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
</nav>
<router-outlet></router-outlet>
Add styles for the navigation in app.component.css:
nav a {
  margin: 0 15px;
  text-decoration: none;
}
.active {
  font-weight: bold;
}
Step 6: Fetch Data from an API:
Create a service:
ng generate service services/data
Add API fetching logic in data.service.ts:
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root',
})
export class DataService {
private apiUrl = 'https://jsonplaceholder.typicode.com/posts';

constructor(private http: HttpClient) {}

getPosts(): Observable<any> {
return this.http.get(this.apiUrl);
}
}
Inject the service into the dashboard.component.ts:
import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
selector: 'app-dashboard',
templateUrl: './dashboard.component.html',
styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
posts: any[] = [];

constructor(private dataService: DataService) {}

ngOnInit(): void {
this.dataService.getPosts().subscribe((data) => {
this.posts = data;
});
}
}
Display the fetched data in dashboard.component.html:

<h2>Posts</h2>
<ul>
  <li *ngFor="let post of posts">
    <h3>{{ post.title }}</h3>
    <p>{{ post.body }}</p>
  </li>
</ul>
Import HttpClientModule in app.module.ts:
import { HttpClientModule } from '@angular/common/http';

@NgModule({
declarations: [
// Components
],
imports: [
// Other modules
HttpClientModule,
],
providers: [],
bootstrap: [AppComponent],
})
export class AppModule {}
Step 7: Build the Application:
npm install typescript@4.8 --save-dev
npm install @types/node@16 --save-dev 3. Set TypeScript skipLibCheck Option
You can instruct TypeScript to ignore type-checking for library files. This will bypass issues in node_modules.

1. Open your tsconfig.json file.
2. Add the skipLibCheck option under compilerOptions:
   {
   "compilerOptions": {
   "skipLibCheck": true,
   ...
   }
   }
   Then run “ng build”
   Step 8: Optional Enhancements:
   Use Bootstrap for UI:
   • npm install bootstrap
   Add the Bootstrap CSS file in angular.json:
   "styles": [
   "node_modules/bootstrap/dist/css/bootstrap.min.css",
   "src/styles.css"
   ]
   Step 9: Add SiteMap and Pre-Rendering HMTL:

. ng add @nguniversal/express-engine@14

1. Generating Sitemaps
   Sitemaps provide search engines with a list of URLs to crawl. Here's how to create one:
   Steps:
1. Create a Sitemap File:
   o Create a file called sitemap.xml in your src/assets folder or the root of your project.
1. Define Static URLs:
   o For static routes, you can manually add entries in the sitemap.xml file:
   <?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://example.com/</loc>
       <lastmod>2024-11-23</lastmod>
       <changefreq>monthly</changefreq>
       <priority>1.0</priority>
     </url>
     <url>
       <loc>https://example.com/about</loc>
       <lastmod>2024-11-23</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
     </url>
   </urlset>

Dynamically Generate URLs:
• For dynamic routes (e.g., blog posts or products), you can use an Angular service or backend API to generate URLs dynamically:
• Example:
// sitemap.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root',
})
export class SitemapService {
constructor(private http: HttpClient) {}

generateSitemap(routes: string[]) {
const baseUrl = 'https://example.com';
return routes
.map(
(route) => `
        <url>
          <loc>${baseUrl}/${route}</loc>
          <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
          <changefreq>daily</changefreq>
          <priority>0.8</priority>
        </url>`
)
.join('');
}
} 3. Pre-rendering Angular Pages

Configure Pre-rendering: Update your angular.json file to include a pre-render target:
"prerender": {
"builder": "@nguniversal/builders:prerender",
"options": {
"browserTarget": "your-app:build:production",
"routes": ["/", "/dashboard"]
}
}

4. Run Pre-render: Generate the static HTML files by running:
   ng run your-app:prerender

Next Steps

1. Verify the Prerendered HTML
   o Navigate to C:\Users\TechZohaib\Desktop\SiteMap-PreRender-App\dist\SiteMap-PreRender-App\browser.

1. Ensure Your Sitemap Exists
   • Locate your generated sitemap.xml file. It should typically reside in your dist folder, such as:
   dist/SiteMap-PreRender-App/browser/sitemap.xml
