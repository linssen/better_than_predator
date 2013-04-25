$(->
    split = (val) ->
        return val.split(/,\s*/)

    extractLast = (term) ->
        return split(term).pop()

    $("input[name='versus']").autocomplete(
        source: (request, response) ->
            $.ajax(
                url: '/_versus'
                data:
                    versus: request.term
                success: (data) ->
                    response($.map(data.films, (item) ->
                        return {label: item, value: item}
                    ))
            )
        minLength: 2
        select: (event, ui) ->
            $("form").trigger("submit")
    )
)