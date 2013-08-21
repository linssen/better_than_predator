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

        select: (event, ui) ->
            event.preventDefault()
            film_id = ui.item.value
            title = ui.item.title
            title = title.replace('&amp;', 'and').replace(' ', '-').toLowerCase()
            title = title.replace(/[^a-z0-9-]+/i, '', title)
            encodeURIComponent(title)
            window.location = "/versus/#{film_id}/#{title}"

        html: true
    )
)