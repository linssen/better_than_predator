<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">

@import '../bootstrap';

/* BODY
--------------------------------------------------------- */
html {
    -webkit-font-smoothing: antialiased;
    height:100%;
    min-height:100%;
}
body {
    @include prefixer(background-size, cover, webkit moz o);

    background-image: url(../assets/bigbg.jpg);
    background-repeat:  no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-color: #050D10;
    min-height: 100%;
    font-family: $font_stack;
    font-size: 100%;
    line-height: 1rem;
    color: #fff;
}
#app {
    @include grid-container;

    padding-top: 1.5rem;

    @include grid-media($small-grid) {
        padding-top: 0.5rem;
    }
}


/* GLOBAL
--------------------------------------------------------- */
a {
    text-decoration: underline;
    color: #fff;

    &:hover,
    &:focus {
        text-decoration: none;
    }
}
.button {
    display: inline-block;
    text-decoration: none;
    line-height: 1em;
    text-align: center;
    background: $color__contast;
    margin-bottom: 1.5rem;
    padding: 1rem 0.5rem;
    padding-left: 4rem;
    position: relative;

    &:hover,
    &:focus {
        background-color: lighten($color__contast, 5);
    }
    &:active {
        background-color: darken($color__contast, 10);
    }
    &:after {
        content: ' ';
        width: 3.5rem;
        height: 100%;
        display: block;
        background: darken($color__contast, 5) no-repeat 50% 50%;
        position: absolute;
        top: 0;
        left: 0;
    }
}
h1 {
    @include grid-column(6);
    @include grid-shift(6);

    font-size: 3.5rem;
    line-height: 1em;
    text-align: center;
    margin-top: 0;
    margin-bottom: 1.5rem;
    color: white;

    @include grid-media($small-grid) {
        @include grid-collapse;
        @include grid-shift(0);

        font-size: 2.5rem;
    }
}
h2 {
    font-size: 2.5rem;
    line-height: 1em;
    padding: 0 0.25rem;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;

    @include grid-media($small-grid) {
        font-size: 1.5rem;
    }
}
h3 {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    font-weight: 300;
}
p {
    margin-bottom: 1em;
    font-weight: 400;
}
hr {
    @include grid-collapse;

    border: 0;
    border-bottom: 1px dashed #fff;
    background: none;
    margin-bottom: 1.5rem;

    @include grid-media($small-grid) {
        display: none;
    }
}
input[type="search"] {
    box-sizing: border-box;
    @include border-top-radius(0);
    @include border-left-radius(0);
    @include border-bottom-radius(0);
    @include border-right-radius(0);

    -webkit-appearance: none;
    display: block;
}
</style>
