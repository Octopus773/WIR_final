import meilisearch


def main():
    client = meilisearch.Client('http://localhost:7700')
    client.index('artists').update_settings({
        'filterableAttributes': [
            'country',
            'type',
            "tags",
            "genres",
            "rank",
            "rating",
        ],
        'sortableAttributes': [
            'rank',
            'rating:value',
        ]
    })


if __name__ == '__main__':
    main()
