import meilisearch
import time, json

def setup_artists(client):
    data = json.loads(open("artists_rank.json").read())
    client.delete_index("artists")
    time.sleep(1)
    client.index("artists").add_documents(data)
    client.index('artists').update_settings({
        'filterableAttributes': [
            'country',
            'type',
            "tags",
            "genres",
            "rank",
        ],
        'sortableAttributes': [
            'rank',
            'rating.value',
        ]
    })

def setup_albums(client):
    # client.delete_index('albums')
    
    # time.sleep(1)
    
    # client.create_index('albums', {'primaryKey': 'id'})
    client.index('albums').update_settings({
        'filterableAttributes': [
            "tags",
            "genres",
        ],
        'sortableAttributes': [
            'date',
            'title',
        ]
    })

if __name__ == '__main__':
    client = meilisearch.Client('http://localhost:7700')
    setup_albums(client)
