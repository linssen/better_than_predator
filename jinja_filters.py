from time import strftime


def datetimeformat(value, format='%d-%m-%Y %H:%M'):
    """Formats a trim struct."""
    return value.strftime(format)
