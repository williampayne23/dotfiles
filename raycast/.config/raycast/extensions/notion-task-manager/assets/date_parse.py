import sys, datetime, json
from recurrent.event_parser import RecurringEvent
from babel.dates import format_timedelta
import pytz

tz = pytz.timezone('Europe/London')

def parse(search):
    r = RecurringEvent()
    res = r.parse(search)
    if res == None:
        return None
    if r.is_recurring:
        return {'repeating': True, 'pretty': r.format(res), 'data': res}
    if res!=None:
        res = tz.localize(res)
        return {'repeating' :False,'data':res.isoformat()}

def search_feedback(search):
    parsed = parse(search)
    print(json.dumps(parsed))
    return
    if parsed == None:
        result = {
            'title': search,
            'subtitle': "No matching date",
            'arg': "0"
        }
    else:
        result = parsed
    print(json.dumps(result))

search_feedback(" ".join(sys.argv[1:]))