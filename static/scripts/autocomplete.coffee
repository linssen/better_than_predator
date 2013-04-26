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
                        if item.thumb
                            thumb = "<img src='#{item.thumb}' width='145' height='200' alt='#{item.title} poster'>"
                        else
                            thumb = ""
                        return {
                            label: "#{thumb} <span>#{item.title} (#{item.year})</span>"
                            value: item.imdb_id
                            thumb: item.thumb
                            title: item.title
                        }
                    ))
            )
        focus: (event, ui) ->
            $("input[name='versus']").val(ui.item.title)
            $("input[name='imdb_id']").val(ui.item.value)
            return false

        select: (event, ui) ->
            $("button[type='submit']")
                .trigger("click")
                .prop("disabled", "disabled")
            return false

        html: true
    )
)