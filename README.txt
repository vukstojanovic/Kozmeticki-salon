Trenutno za backend koristimo json-server
Pokrece se tako sto se najpre udje u client folder pa komanda: npm run serve
Endpointi su: 
1) localhost:4000/categories (za kategorije)
2) localhost:4000/services (za usluge)
3) localhost:4000/workers (za kozmeticarke)

NOVO!!!
Sada se zapravo moze koristiti node
Pokrece se tako sto se najpre udje u server folder pa komanda: npm run dev
Endpointi su isti kao i kod json-servera

EVO CIRO, NACRTANO SAMO ZA TEBE

Post request za categories endpoint:
{
    name: String
}

Post request za services endpoint:
    {
      "category_id": String (id kategorije kojoj pripada),
      "name": String,
      "time_in_minutes": Number,
      "price": Number,
      "workers_id": niz Stringova (tj id-jeva radnica koje obavljaju ovu uslugu)
    }

Post request za workers endpoint:
    {
      "name": String,
      "image": String
    }

Kod Put requesta za bilo koji od ovih endpointa se umesto :id stavlja id (kategorije, usluge, radnice) ciji property zelis da izmenis
Npr localhost:4000/workers/3 (radnica ciji je id 3)

i kao payload saljes samo property koji zelis da izmenis, npr:

{
    "image": nova vrednost slike
}

Kod Delete requesta za koji od ovih endpointa se umesto :id stavlja id (kategorije, usluge, radnice) koje zelis da obrises
Npr localhost:4000/workers/3 (radnica ciji je id 3) i kao payload ne prosledjujes nista

Endpoint za autentifikaciju je localhost:4000/auth/login, to je post request koji za payload salje username i password koji su fiksni:
{
  username: "Marija",
  password: "filadelfija123"
}

nakon uspesne autentifikacije dobijate token koji bi trebalo da istice nakon 3 minuta kada trebate opet da se logujete