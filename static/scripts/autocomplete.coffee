$(->
    split = (val) ->
        return val.split(/,\s*/)

    extractLast = (term) ->
        return split(term).pop()

    $("input[name='versus']").bind("keydown", (event) ->
        if (event.keyCode is $.ui.keyCode.TAB and $(this).data("ui-autocomplete").menu.active)
            event.preventDefault()
    ).autocomplete(
        source: (request, response) ->
            $.getJSON("/_versus", {
                versus: extractLast(request.title)
            }, response)
        search: ->
            title = extractLast(this.value)
            if title.length < 2 then return false
        focus: ->
            return false
        select: ->
            titles = split(this.value)
            titles.pop()
            titles.push(ui.item.value)
            titles.push("")
            this.value = titles.join(", ")
            return false
    )
)
###
      .autocomplete({
        source: function( request, response ) {
          $.getJSON( "search.php", {
            term: extractLast( request.term )
          }, response );
        },
        search: function() {
          // custom minLength
          var term = extractLast( this.value );
          if ( term.length < 2 ) {
            return false;
          }
        },
        focus: function() {
          // prevent value inserted on focus
          return false;
        },
        select: function( event, ui ) {
          var terms = split( this.value );
          // remove the current input
          terms.pop();
          // add the selected item
          terms.push( ui.item.value );
          // add placeholder to get the comma-and-space at the end
          terms.push( "" );
          this.value = terms.join( ", " );
          return false;
        }
      });
  });
###