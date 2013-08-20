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
                    response($.map(data.result, (item) ->
                        return {
                            label: "<span>#{item.title} (#{item.year})</span>"
                            value: item.imdb_id
                            title: item.title
                        }
                    ))
            )
        focus: (event, ui) ->
            $("input[name='versus']").val(ui.item.title)
            $("input[name='film_id']").val(ui.item.value)
            return false

        select: (event, ui) ->
            $("form").submit();

        html: true
    )
)