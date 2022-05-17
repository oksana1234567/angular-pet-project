import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
       imports: [
        HttpClientTestingModule,
        NgxPaginationModule
      ],
      providers: [{ provide: Router, useClass: RouterStub }],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getArticlesByTag should be called', () => {
    let spy = spyOn(component, 'getArticlesByTag').and.callThrough();
    spy.calls.reset();
    component.getArticlesByTag(50, 0, 'tag');
    expect(spy).toHaveBeenCalledOnceWith(50, 0, 'tag');
  });

  // it('getArticlesYourFeed should be called', () => {
  //   let spy = spyOn(component, 'getArticlesYourFeed').and.callThrough();
  //   spy.calls.reset();
  //   component.getArticlesYourFeed(50, 0);
  //   expect(spy).toHaveBeenCalledOnceWith(50, 0);
  // });
  
  it('showYourFeed should be called', () => {
    let spy = spyOn(component, 'showYourFeed').and.callThrough();
    spy.calls.reset();
    component.showYourFeed();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('showAllArticles should be called', () => {
    let spy = spyOn(component, 'showAllArticles').and.callThrough();
    spy.calls.reset();
    component.showAllArticles();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('deleteTag should be called', () => {
    let spy = spyOn(component, 'deleteTag').and.callThrough();
    spy.calls.reset();
    component.deleteTag();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('handlePageChange should be called', () => {
    let spy = spyOn(component, 'handlePageChange').and.callThrough();
    spy.calls.reset();
    component.handlePageChange(1);
    expect(spy).toHaveBeenCalledOnceWith(1);
  });

  it('countChangedHandler should be called', () => {
    let spy = spyOn(component, 'countChangedHandler').and.callThrough();
    spy.calls.reset();
    component.countChangedHandler('1');
    expect(spy).toHaveBeenCalledOnceWith('1');
  });

  it('slugChangedHandler should be called', () => {
    let spy = spyOn(component, 'slugChangedHandler').and.callThrough();
    spy.calls.reset();
    component.slugChangedHandler('1');
    expect(spy).toHaveBeenCalledOnceWith('1');
  });

  
});
