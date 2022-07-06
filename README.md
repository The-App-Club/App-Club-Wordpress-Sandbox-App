# App-Club-Wordpress-Sandbox-App


```bash
https://codemyui.com/wp-json/wp/v2
```


```bash
https://codemyui.com/wp-json/wp/v2/posts
```

```bash
https://codemyui.com/wp-json/wp/v2/posts?tags=138009468,2434200
```

```bash
https://codemyui.com/wp-json/wp/v2/posts?tags=138009468&after=2020-07-24T01:10:16
```

```bash
https://codemyui.com/wp-json/wp/v2/posts?tags=138009468&after=2020-07-24T01:10:16&_fields=date,id,excerpt,title,link,jetpack_featured_media_url
```

```bash
curl -L 'https://codemyui.com/wp-json/wp/v2/posts?tags=138009468&after=2020-07-24T01:10:16&_fields=date,id,excerpt,title,link,jetpack_featured_media_url' -o sample2.json;cat sample2.json | jq '' | sponge sample2.json
```

```bash
curl -L 'https://codemyui.com/wp-json/wp/v2/posts?tags=138009468,2434200&_fields=date,id,excerpt,title,link,tags,jetpack_featured_media_url' -o sample3.json;cat sample3.json | jq '' | sponge sample3.json
```
