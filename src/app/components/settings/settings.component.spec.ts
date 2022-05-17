import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ResponseUser } from 'src/app/shared/models/ResponseUser.model';
import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;

  const draftResUser: ResponseUser =  {
    email: 'email',
    token: 'token',
    username: 'username',
    bio: 'bio',
    image: 'href'
  }

  class RouterStub {
    url = '';
    navigateByUrl(commands: any[], extras?: any) { }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SettingsComponent],
       imports: [
        HttpClientTestingModule,
      ],
      providers: [{ provide: Router, useClass: RouterStub }],
       schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    })
      .compileComponents();
    
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('doUserLogout should be called', () => {
    let spy = spyOn(component, 'doUserLogout').and.callThrough();
    spy.calls.reset();
    component.doUserLogout();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('publish should be called', () => {
    let spy = spyOn(component, 'publish').and.callThrough();
    spy.calls.reset();
    component.publish();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  
  it('updareForm should be called', () => {
    let spy = spyOn(component, 'updareForm').and.callThrough();
    spy.calls.reset();
    component.updareForm(draftResUser);
    expect(spy).toHaveBeenCalledOnceWith(draftResUser);
  });
});
