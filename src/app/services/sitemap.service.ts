// sitemap.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SitemapService {
  constructor(private http: HttpClient) {}

  generateSitemap(routes: string[]) {
    const baseUrl = 'https://jsonplaceholder.typicode.com/posts';
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
}
