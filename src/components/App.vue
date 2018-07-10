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
    background-image: url(/static/images/bigbg.jpg);
    @include prefixer(background-size, cover, webkit moz o);
    background-repeat:  no-repeat;
    background-position: center center;
    background-attachment: fixed;
    background-color: #050D10;
    min-height: 100%;
    font-family: $font_stack;
    font-size: 100%;
    line-height: em(16);
    color: #fff;
}
#main {
    @include grid-container;

    padding-top: em(24);

    @include grid-media($small-grid) {
        padding-top: em(8);
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
    margin-bottom: em(24, 24);
    padding: em(16, 24) em(8, 24);
    padding-left: em(64, 24);
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
        width: em(56, 24);
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

    font-size: em(56);
    line-height: 1em;
    text-align: center;
    margin-top: 0;
    margin-bottom: em(24, 56);
    color: white;

    @include grid-media($small-grid) {
        @include grid-collapse;
        @include grid-shift(0);

        font-size: em(40);
    }
}
h2 {
    font-size: em(40);
    line-height: 1em;
    padding: 0 em(4, 40);
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    text-transform: uppercase;

    @include grid-media($small-grid) {
        font-size: em(24);
    }
}
h3 {
    font-size: em(40, 24);
    margin-bottom: em(24, 40);
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
    margin-bottom: em(24, 24);

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
