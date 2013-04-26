$(->
    $("input[name='versus']").bind("keydown", (event) ->
        if (event.keyCode is $.ui.keyCode.TAB and $(this).data("ui-autocomplete").menu.active)
            event.preventDefault()
    ).autocomplete(
        source: (request, response) ->
            $.ajax(
                dataType: "json"
                url: "/_versus"
                data:
                    versus: request.term
                    limit: 10
                success: (data) ->
                    response($.map(data.films, (item) ->
                        return {
                            label: "#{item.title} (#{item.year})"
                            value: item.imdb_id
                        }
                    ))
            )
        select: (event, ui) ->
            $("input[name='imdb_id']").val(ui.item.value)
            $("form").trigger("submit")
    )
)