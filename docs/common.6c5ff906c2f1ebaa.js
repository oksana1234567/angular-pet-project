"use strict";(self.webpackChunkreal_world=self.webpackChunkreal_world||[]).push([[592],{3450:($,h,r)=>{r.d(h,{j:()=>p});var c=r(1135),u=r(7579),n=r(4004),_=r(2340),s=r(1223),v=r(520),l=r(7656);let p=(()=>{class o{constructor(t,e){this.http=t,this.router=e,this.environment=_.N,this.articles$=new c.X([]),this.tags$=new u.x,this.articlesFeed$=new c.X([])}getAllArticles(t,e){return this.http.get(`${this.environment.url}/articles?limit=${t}&offset=${e}`).pipe((0,n.U)(i=>(this.articles$.next(i.articles),i.articles)))}getOwnArticles(t,e,i){return this.http.get(`${this.environment.url}/articles?author=${t}&limit=${e}&offset=${i}`).pipe((0,n.U)(a=>(this.articles$.next(a.articles),a.articles)))}getAllFavoritedArticles(t,e,i){return this.http.get(`${this.environment.url}/articles?limit=${t}&offset=${e}&favorited=${i}`).pipe((0,n.U)(a=>(this.articles$.next(a.articles),a.articles)))}getAllArticlesByTag(t,e=0,i){return this.http.get(`${this.environment.url}/articles?limit=${t}&offset=${e}&tag=${i}`).pipe((0,n.U)(a=>(this.articles$.next(a.articles),a.articles)))}getTags(){return this.http.get(`${this.environment.url}/tags`).pipe((0,n.U)(t=>(this.tags$.next(t.tags),t.tags)))}getArticleSlug(t){return this.slug=t}getArticle(t){return this.http.get(`${this.environment.url}/articles/${t}`,{}).pipe((0,n.U)(e=>e.article))}deleteArticle(){return this.http.delete(`${this.environment.url}/articles/${this.slug}`)}getArticlesFeed(t,e){return this.http.get(`${this.environment.url}/articles/feed/?limit=${t}&offset=${e}`).pipe((0,n.U)(i=>(this.articlesFeed$.next(i.articles),i.articles)))}postArticle(t){return this.http.post(`${this.environment.url}/articles`,{article:t}).pipe((0,n.U)(e=>(e.article&&this.router.navigateByUrl(`article/${e.article.slug}`),e.article)))}postUpdatedArticle(t,e){return this.http.put(`${this.environment.url}/articles/${e}`,{article:t}).pipe((0,n.U)(i=>(i.article&&this.router.navigateByUrl(`article/${i.article.slug}`),i.article)))}}return o.\u0275fac=function(t){return new(t||o)(s.LFG(v.eN),s.LFG(l.F0))},o.\u0275prov=s.Yz7({token:o,factory:o.\u0275fac,providedIn:"root"}),o})()},9453:($,h,r)=>{r.d(h,{n:()=>_});var c=r(2340),u=r(1223),n=r(520);let _=(()=>{class s{constructor(l){this.http=l,this.environment=c.N}like(l){return this.http.post(`${this.environment.url}/articles/${l}/favorite`,{})}likeDelete(l){return this.http.delete(`${this.environment.url}/articles/${l}/favorite`,{})}}return s.\u0275fac=function(l){return new(l||s)(u.LFG(n.eN))},s.\u0275prov=u.Yz7({token:s,factory:s.\u0275fac,providedIn:"root"}),s})()},18:($,h,r)=>{function c(u){return n=>u.test(n.value)?null:{mustBePassword:{value:n.value}}}r.d(h,{F:()=>c})}}]);