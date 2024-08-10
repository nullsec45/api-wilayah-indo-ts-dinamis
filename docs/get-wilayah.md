# API Endpoint Get Wilayah Spec

## GET Data All Provinces

Endpoint : GET /v1/provinces

Response Body Success :

```json
[
  {
    "id": 1,
    "name": "Aceh"
  },
  {
    "id": 2,
    "name": "Sumatera Utara"
  }
]
```

Response Body Error :

```json
[
  {
    "message": "error, unable to retrieve data from all provinces",
    "errors": []
  }
]
```

## Get Data Kota/Kabupaten

Endpoint : GET /v1/regencies/{id}

Reponse Body Success :

```json
[
  {
    "id": "1301",
    "province_id": "13",
    "name": "KABUPATEN KEPULAUAN MENTAWAI"
  },
  {
    "id": "1371",
    "province_id": "13",
    "name": "KOTA PADANG"
  }
]
```

Response Body Error :

```json
[
  {
    "message": "error, unable to retrieve data regencies from province {name}",
    "errors": []
  }
]
```

## Get Data Kecamatan

Endpoint : GET /v1/districts/{id}

Reponse Body Success :

```json
[
  {
    "id": "1371010",
    "regency_id": "1371",
    "name": "BUNGUS TELUK KABUNG"
  },
  {
    "id": "1371020",
    "regency_id": "1371",
    "name": "LUBUK KILANGAN"
  }
]
```

Response Body Error :

```json
[
  {
    "message": "error, unable to retrieve data districts from regency {name}",
    "errors": []
  }
]
```

## Get Data Kelurahan

Endpoint : GET /v1/villages/{id}

Reponse Body Success :

```json
[
  {
    "id": "1371010001",
    "district_id": "1371010",
    "name": "TELUK KABUNG SELATAN"
  },
  {
    "id": "1371010007",
    "district_id": "1371010",
    "name": "BUNGUS SELATAN"
  }
]
```

Response Body Error :

```json
[
  {
    "message": "error, unable to retrieve data villages from district {name}",
    "errors": []
  }
]
```
