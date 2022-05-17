import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Articles } from '../shared/models/articles.model';
import { CreateArticle } from '../shared/models/createArticle.model';
import { Tags } from '../shared/models/tags.model';

import { GetArticleService } from './getArticles.service';

describe('GetArticleService', () => {
  let service: GetArticleService;

  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }
  
  const draftArticles: { articles: Articles[]} = {
    articles: [{
      slug: 'slug',
      title: 'title',
      description: 'description',
      body: 'body',
      tagList: ['tagList'],
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
      favorited: true,
      favoritesCount: 123,
      author: {
        username: 'username',
        bio: 'bio',
        image: 'image',
        following: false,
      }
    }]
  }
  
  let httpMock = {
    get: jasmine.createSpyObj(of()),
    put: jasmine.createSpyObj(of()),
    post: jasmine.createSpyObj(of()),
    delete: jasmine.createSpyObj(of())
  };

  const draftTags: { tags: Tags[]} = {
    tags: []
  };

 const draftNewArticle: CreateArticle = {
    title: "title",
    description: "description",
    body: "body",
    tagList: ["tag"]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: HttpClient, useValue: httpMock },
        { provide: Router, useClass: RouterStub }]
    });
    service = TestBed.inject(GetArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Slug', () => {
    spyOn(service, 'getArticleSlug').and.callThrough();
    let a = service.getArticleSlug('slug-there');
    let b = service.getArticleSlug('another-slug');
    expect(a).toBe('slug-there', 'should be slug-there')
    expect(b).toBe('another-slug', 'should be another-slug')
  });
    
 it('deleteArticle should be called', waitForAsync(() => {    
   const spy = spyOn(httpMock, 'delete').and.returnValue(of());
   service.deleteArticle();
   expect(spy).toHaveBeenCalled();
  }));

  it('getTags() should execute http request', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftTags));
    service.getTags().subscribe((data) => {
    expect(data).toEqual(draftTags.tags);
    });
  }));
  
  it('postArticle() should execute http request', waitForAsync(() => {
    const spy = spyOn(httpMock, 'put').and.returnValue(of());
    const data = service.postUpdatedArticle(draftNewArticle, 'slug').subscribe();
    expect(data).toBeTruthy();
  }));

  it('postUpdatedArticle() should execute http request', waitForAsync(() => {
    const spy = spyOn(httpMock, 'put').and.returnValue(of());
    const data = service.postUpdatedArticle(draftNewArticle, 'slug').subscribe();
    expect(data).toBeTruthy();
    }));

  it('should check if getAllFavoritedArticles return articles', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftArticles));
    service.getAllFavoritedArticles(50, 0, 'name').subscribe((data) => {
    expect(data).toEqual(draftArticles.articles);
    });
  }))

  it('should check if getOwnArticles return articles', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftArticles));
    service.getOwnArticles('name', 50, 0).subscribe((data) => {
    expect(data).toEqual(draftArticles.articles);
    });
  }))

  it('should check if getAllArticles return articles', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftArticles));
    service.getAllArticles(50, 0).subscribe((data) => {
    expect(data).toEqual(draftArticles.articles);
    });
  }))
  
  it('should check if getAllArticlesByTag return articles', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftArticles));
    service.getAllArticlesByTag(50, 0, 'tag').subscribe((data) => {
    expect(data).toEqual(draftArticles.articles);
    });
  }));

  it('should check if getArticlesFeed return articles', waitForAsync(() => {
    const spy = spyOn(httpMock, 'get').and.returnValue(of(draftArticles));
    service.getArticlesFeed(50, 0).subscribe((data) => {
    expect(data).toEqual(draftArticles.articles);
    });
  }));
});
