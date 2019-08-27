(function(e){function t(t){for(var r,s,o=t[0],l=t[1],c=t[2],d=0,f=[];d<o.length;d++)s=o[d],i[s]&&f.push(i[s][0]),i[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);u&&u(t);while(f.length)f.shift()();return a.push.apply(a,c||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var l=n[o];0!==i[l]&&(r=!1)}r&&(a.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},i={app:0},a=[];function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=t,o=o.slice();for(var c=0;c<o.length;c++)t(o[c]);var u=l;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"244e":function(e,t,n){},"4d06":function(e,t,n){"use strict";var r=n("d954"),i=n.n(r);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"w-full max-w-5xl font-sans",attrs:{id:"app"}},[n("router-view")],1)},a=[],s=(n("ba8c"),{name:"App"}),o=s,l=(n("9993"),n("2877")),c=Object(l["a"])(o,i,a,!1,null,null,null);c.options.__file="App.vue";var u=c.exports,d=n("8c4f"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("typeahead")},p=[],m=n("be94"),h=n("2f62"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"\n  flex items-center justify-center flex-wrap\n  w-full md:w-2/3 lg:w-1/2\n  p-4 mr-auto ml-auto\n"},[n("input",{directives:[{name:"model",rawName:"v-model",value:e.localQuery,expression:"localQuery"}],staticClass:"\n      w-full bg-grey-lighter text-grey-darker text-3xl p-2\n      rounded-sm appearance-none focus:outline-none focus:shadow-outline\n    ",class:{loading:e.isLoading},attrs:{type:"search",placeholder:"Find a film..."},domProps:{value:e.localQuery},on:{keyup:[function(t){if(!("button"in t)&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"]))return null;e.navigateList(1)},function(t){if(!("button"in t)&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"]))return null;e.navigateList(-1)},function(t){return"button"in t||!e._k(t.keyCode,"enter",13,t.key,"Enter")?e.selectFilm(t):null}],input:function(t){t.target.composing||(e.localQuery=t.target.value)}}}),n("ul",{staticClass:"w-full list-reset bg-black"},e._l(e.films,function(t,r){return n("li",{key:r,staticClass:"block",on:{mouseenter:function(t){e.setIndex(r)}}},[n("router-link",{staticClass:"block text-xl text-white no-underline p-2 w-full hover:bg-grey-darkest",class:{"bg-grey-darkest":r===e.selectedIndex},attrs:{to:{name:"result",params:{id:t.id,slug:t.slug}}}},[e._v("\n        "+e._s(t.title)+" ("+e._s(t.releaseDate.getFullYear())+")\n      ")])],1)}),0)])},g=[],b=(n("386d"),{name:"Typeahead",data:function(){return{selectedIndex:0,localQuery:"",debounceTimer:null}},created:function(){this.clearFilms()},watch:{localQuery:function(e){this.debounceTimer&&window.clearTimeout(this.debounceTimer),this.debounceTimer=window.setTimeout(this.search,400,{query:e})}},computed:Object(m["a"])({},Object(h["d"])(["films","isLoading"])),methods:Object(m["a"])({},Object(h["b"])(["clearFilms","search"]),{navigateList:function(e){var t=this.selectedIndex+e,n=(this.films||[]).length-1;t<=0&&(t=0),t>=n&&(t=n),this.selectedIndex=t},setIndex:function(e){this.selectedIndex=e},selectFilm:function(){var e=this.films[this.selectedIndex];this.$router.push({name:"result",params:{id:String(e.id),slug:e.slug}})}})}),w=b,y=(n("4d06"),Object(l["a"])(w,v,g,!1,null,null,null));y.options.__file="Typeahead.vue";var _=y.exports,x={name:"Search",components:{Typeahead:_},created:function(){this.clearFilms()},methods:Object(m["a"])({},Object(h["b"])(["clearFilms"]))},k=x,O=(n("e589"),Object(l["a"])(k,f,p,!1,null,null,null));O.options.__file="Search.vue";var j=O.exports,C=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.winner?n("div",{staticClass:"p-4"},[n("h1",{staticClass:"\n    title w-full md:w-1/2\n    text-white text-5xl text-center\n    block md:float-right\n    mb-6 pb-6\n  "},[e._v("\n    "+e._s(e.winner.title)+" wins!\n  ")]),n("div",{staticClass:"films w-full md:w-1/2 flex block md:float-left"},e._l(e.films,function(t){return n("div",{key:t.id,staticClass:"bg-white p-2 mr-4"},[n("img",{attrs:{alt:t.title,src:e.poster(t.id),width:"400"}}),n("div",{staticClass:"flex items-center pt-4 justify-between"},[n("span",{staticClass:"score-text"},[e._v("\n          "+e._s(t.voteAvg)+"\n          "),n("span",{staticClass:"text-grey text-4xl -ml-1 hidden sm:inline md:hidden lg:inline"},[e._v("/ 10")])]),n("Score",{staticClass:"score-chart",attrs:{voteAvg:t.voteAvg}})],1)])}),0),n("div",{staticClass:"blurb text-white w-full md:w-1/2 float-right"},[n("hr"),n("h3",{staticClass:"text-3xl mb-6"},[e._v("Why does this even exist?")]),e._m(0),n("router-link",{staticClass:"btn btn-back mr-4",attrs:{to:{name:"search"}}},[e._v("\n      Again!\n    ")]),n("a",{staticClass:"btn btn-tweet",attrs:{href:e.tweetUrl,target:"_blank"}},[e._v("\n      Tweet this\n    ")]),n("p",{staticClass:"text-base"},[e._v("\n      Copyright © "+e._s(e.year)+" "),n("a",{attrs:{href:"http://linssen.me/"}},[e._v("Wil Linssen")]),e._v(",\n      and all of the code is "),n("a",{attrs:{href:"http://github.com/linssen/better_than_predator"}},[e._v("on GitHub")]),e._v("."),n("br"),e._v("\n      Powered by "),n("a",{attrs:{href:"https://www.themoviedb.org/"}},[e._v("themoviedb.org")]),e._v(".\n    ")])],1)]):e._e()},S=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("p",{},[e._v("\n      Because "),n("a",{attrs:{href:"https://www.linssen.me/"}},[e._v("Wil")]),e._v(",\n      "),n("a",{attrs:{href:"http://gregorywood.co.uk/"}},[e._v("Greg")]),e._v(", and Glen were in a pub\n      once and they thought you should be able to compare films to Predator.\n      It is after all the ultimate benchmark.\n    ")])}],F=(n("7514"),function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("svg",{attrs:{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 36 36"}},[n("path",{attrs:{d:"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",fill:"none",stroke:"#eee","stroke-width":"4"}}),n("path",{attrs:{d:"M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831",fill:"none",stroke:"#CD2E1B","stroke-width":"4","stroke-dasharray":e.stroke}}),n("text",{attrs:{x:"50%",y:"50%","text-anchor":"middle","dominant-baseline":"middle"}},[e._v(e._s(e.percent)+"%")])])}),I=[],L=(n("c5f6"),{name:"Score",props:{voteAvg:{type:Number,default:0}},computed:{percent:function(){return Math.round(10*this.voteAvg)},stroke:function(){return"".concat(this.percent,", 100")}}}),T=L,q=(n("5b06"),Object(l["a"])(T,F,I,!1,null,null,null));q.options.__file="Score.vue";var A=q.exports,P={name:"Result",components:{Score:A},props:{id:{type:String,required:!0},slug:{type:String,required:!0}},data:function(){return{year:(new Date).getFullYear()}},computed:Object(m["a"])({},Object(h["d"])(["films"]),Object(h["c"])(["filmsByScore","poster"]),{winner:function(){return this.filmsByScore[0]},versus:function(){return this.films.find(function(e){return 106!==e.id})},tweetUrl:function(){if(!this.winner||!this.versus)return"";var e="http://www.betterthanpredator.com/#/versus/".concat(this.id,"/").concat(this.slug,"/"),t=106===this.winner.id?"n’t as good as":"better than",n="I just found out that ".concat(this.versus.title," ")+"(".concat(this.versus.releaseDate.getFullYear(),") is").concat(t," Predator.");return"https://twitter.com/share/"+"?url=".concat(encodeURIComponent(e))+"&via=linssen"+"&text=".concat(encodeURIComponent(n))}}),created:function(){this.clearFilms(),this.find({id:106}),this.find({id:this.id})},methods:Object(m["a"])({},Object(h["b"])(["find","clearFilms"]))},E=P,R=(n("d7c3"),Object(l["a"])(E,C,S,!1,null,null,null));R.options.__file="Result.vue";var $=R.exports;r["a"].use(d["a"]);var D=new d["a"]({routes:[{path:"/",component:j,name:"search"},{path:"/versus/:id/:slug",component:$,name:"result",props:!0}]}),M=(n("55dd"),n("ac6a"),n("456d"),{get:function(e){return new Promise(function(t,n){var r=new XMLHttpRequest,i=Object.keys(e.payload).map(function(t){var n=encodeURIComponent(e.payload[t]);return"".concat(t,"=").concat(n)}).join("&");r.open("GET","".concat(e.url,"?").concat(i)),r.onload=function(){return t(r)},r.onerror=function(){return n(r)},r.send()})}}),Q={find:function(e){var t={query:e,api_key:"7fde67af78a621923d00705787723896",page:1,include_adult:!1,search_type:"ngram"};return M.get({payload:t,url:"https://api.themoviedb.org/3/search/movie"})},findOne:function(e){var t={api_key:"7fde67af78a621923d00705787723896"};return M.get({payload:t,url:"https://api.themoviedb.org/3/movie/".concat(e)})}};n("a481");function U(e){var t=e.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()]/g,"").replace(/\s{2,}/g," ").replace(/\s/g,"-").toLowerCase();return encodeURIComponent(t)}function B(e){return{id:parseInt(e.id,10),title:e.title,releaseDate:new Date(e.release_date),voteAvg:parseFloat(e.vote_average),slug:U(e.title),posterPath:e.poster_path}}r["a"].use(h["a"]);var G={search:function(e,t){e.commit("setQuery",{query:t.query}),!e.state.query||e.state.query.length<2?e.commit("clearFilms"):(e.commit("toggleIsLoading",!0),Q.find(e.state.query).then(function(t){return e.commit("searchReceived",t)}))},find:function(e,t){e.commit("toggleIsLoading",!0),Q.findOne(t.id).then(function(t){return e.commit("found",t)})},clearFilms:function(e){e.commit("clearFilms")}},J={filmsByScore:function(e){return e.films.slice().sort(function(e,t){return parseFloat(t.voteAvg)-parseFloat(e.voteAvg)})},poster:function(e){return function(t){var n=e.films.find(function(e){return e.id===t});return"http://image.tmdb.org/t/p/original/".concat(n.posterPath)}}},N={toggleIsLoading:function(e,t){null!==t&&"undefined"!==typeof t||(e.isLoading=!e.isLoading),e.isLoading=t},setQuery:function(e,t){e.query=t.query},clearFilms:function(e){e.films=[]},found:function(e,t){e.isLoading=!1,e.films.push(B(JSON.parse(t.responseText)))},searchReceived:function(e,t){e.isLoading=!1,e.films=JSON.parse(t.responseText).results.filter(function(e){return e.vote_count>0}).map(B)}},W=new h["a"].Store({state:{isLoading:!1,query:null,films:[]},actions:G,mutations:N,getters:J});r["a"].config.productionTip=!1,new r["a"]({router:D,store:W,render:function(e){return e(u)}}).$mount("#app")},"5b06":function(e,t,n){"use strict";var r=n("778d"),i=n.n(r);i.a},"778d":function(e,t,n){},9993:function(e,t,n){"use strict";var r=n("c352"),i=n.n(r);i.a},ba8c:function(e,t,n){},c352:function(e,t,n){},d7c3:function(e,t,n){"use strict";var r=n("fe61"),i=n.n(r);i.a},d954:function(e,t,n){},e589:function(e,t,n){"use strict";var r=n("244e"),i=n.n(r);i.a},fe61:function(e,t,n){}});
//# sourceMappingURL=app.a44a5da0.js.map