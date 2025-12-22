Adicionei uma ubase_url de API atraves da variável NEXT_PUBLIC_API_BASE_URL adicionada no arquivo .env.local


Pegue os campos necessários para montar o card com iamgem, titulo, tipo, datsa 


# Na seção eventos e events faça as chamadas

No card maior liste as conferencias, se estiver vazio nao mostre o card 

GET /events/open/conferences

{
  "data": [
    {
      "banner_path": "string",
      "capacity": 0,
      "created_at": "string",
      "created_by_user_id": "string",
      "description": "string",
      "end_at": "string",
      "event_type": "string",
      "id": "string",
      "is_free": true,
      "location": "string",
      "online_url": "string",
      "price": 0,
      "start_at": "string",
      "title": "string",
      "updated_at": "string"
    }
  ],
  "limit": 0,
  "offset": 0,
  "total": 0
}

# Nos cards abaixo mostre

GET /events/open/without-conferences

{
  "data": [
    {
      "banner_path": "string",
      "capacity": 0,
      "created_at": "string",
      "created_by_user_id": "string",
      "description": "string",
      "end_at": "string",
      "event_type": "string",
      "id": "string",
      "is_free": true,
      "location": "string",
      "online_url": "string",
      "price": 0,
      "start_at": "string",
      "title": "string",
      "updated_at": "string"
    }
  ],
  "limit": 0,
  "offset": 0,
  "total": 0
}