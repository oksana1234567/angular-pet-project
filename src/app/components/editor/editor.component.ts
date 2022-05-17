import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetArticleService } from 'src/app/services/getArticles.service';
import { environment } from 'src/environments/environment';
import { Articles } from 'src/app/shared/models/articles.model';
import { CreateArticle } from 'src/app/shared/models/createArticle.model';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [ GetArticleService]
})

export class EditorComponent implements OnInit, OnDestroy {

  public newArticleForm!: FormGroup;
  public newArticle!: CreateArticle;
  public slug!: string | null;
  public environment = environment;
  public article!: Articles;
  public fieldError!: string;
  public problemError!: string;
  public subscriptionArticle$!: Subscription;
  public subscriptionUpdateArticle$!: Subscription;
  public subscriptionPublishArticle$!: Subscription;
  private subscriptions$: Subscription[] = [];
  
  constructor(private router: Router,
    private route: ActivatedRoute,
    private getArticleService: GetArticleService) { }

  ngOnInit() {
    this.getSlug();
    this.gettingArticleData();
  }
  
  public getSlug(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.slug = paramMap.get('slug');
    })
  }

  public gettingArticleData(): void {
    if (this.slug) {
      this.subscriptionArticle$ = this.getArticleService.getArticle(this.slug).subscribe(data => {
        this.article = data;
        this.generateForm(this.article);
      })
    }
    this.subscriptions$.push(this.subscriptionArticle$);
    this.updateForm();
  }

  public generateForm(article: Articles): FormGroup {
    return this.newArticleForm = new FormGroup({
        title: new FormControl(article.title),
        description: new FormControl(article.description),
        body: new FormControl(article.body),
        tagList: new FormControl(article.tagList),
    })
  }

  public updateForm(): FormGroup {
    return this.newArticleForm = new FormGroup({
        title: new FormControl(''),
        description: new FormControl(''),
        body: new FormControl(''),
        tagList: new FormControl(''),
    })
  }

  public update(): void {
    if (this.newArticleForm.value.tagList.length) {
      this.newArticle = { ... this.newArticleForm.value, tagList: this.newArticleForm.value.tagList.split(',') };
    } else {
      this.newArticle = { ... this.newArticleForm.value };
    }
    this.subscriptionUpdateArticle$ = this.getArticleService.postUpdatedArticle(this.newArticle, this.slug).subscribe({next: () => {},
          error: (error) => {
            this.fieldError = error.fieldError;
            this.problemError = error.problemError;
          }
        }); 
    this.subscriptions$.push(this.subscriptionUpdateArticle$);
  }

  public publish(): void {
    if (this.newArticleForm.value.tagList.length) {
      this.newArticle = { ... this.newArticleForm.value, tagList: this.newArticleForm.value.tagList.split(',') };
    } else {
      this.newArticle = { ... this.newArticleForm.value };
    }
    this.subscriptionPublishArticle$ = this.getArticleService.postArticle(this.newArticle).subscribe();
    this.subscriptionArticle$ = this.getArticleService.getAllArticles(50, 0).subscribe();
    this.subscriptions$.push(this.subscriptionPublishArticle$);
  }
  
  ngOnDestroy() {
    this.subscriptions$.forEach((subscription) => {if (subscription) { subscription.unsubscribe() } })
  }
}
