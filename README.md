# PESTKA - E-Commerce Store (coop-shop) 🛒⚡

Nowoczesny, pełnoprawny sklep internetowy z elektroniką, podzespołami komputerowymi i sprzętem gamingowym zbudowany w oparciu o **Django 5 / 6 + Django REST Framework** oraz **React 18 + Vite**.

Projekt przeszedł **kompletny rewrite (refaktoryzację od zera)**, eliminując wszystkie anty-wzorce, błędy architektoniczne i niebezpieczne rozwiązania z pierwotnej wersji.

---

## 🛠️ Podsumowanie zmian – co zostało naprawione?

| Kategoria | Stara wersja (Poprzednie błędy) | Nowa wersja (Po kompletnym rewrite) |
|---|---|---|
| **Komunikacja Front-Back** | Dane przesyłane w szablonie Django jako stringi rozdzielane `***` i `;;;` z hardcoded 20 podkategoriami (`{% getProductsFromSubcat 1 %}`). | **Czyste REST API (Django REST Framework)** z endpointami JSON, paginacją, filtrowaniem i relacjami. |
| **Baza danych i Modele** | Błędne nazwy modeli w liczbie mnogiej (`Users`, `subCategories`, `Basket`), ceny jako `FloatField`, brak relacji. | Czyste modele PEP 8 (`Category`, `Subcategory`, `Product`, `Cart`, `Order`), waluty jako `DecimalField`. |
| **Uwierzytelnianie** | Własna tabela `Users` z hashowaniem hasła solą `&sayu#` i sprawdzaniem query stringów `str(checkLogin) == "<QuerySet []>"`. | Standardowy **Django Auth (`django.contrib.auth`)** z bezpiecznym hashowaniem PBKDF2, sesjami i endpointami logowania/rejestracji. |
| **Logika koszyka** | Formularze HTML przeładowujące całą stronę przy każdym kliknięciu, zagnieżdżone `<form>` w `<form>`. | **Reaktywny koszyk SPA** (`CartContext`) z natychmiastową aktualizacją ilości, usuwaniem i toastami bez przeładowania. |
| **Nawigacja i Kategorie** | Sztywno zakodowane ify: `if (el === "Podzespoły komputerowe") navigate("/A")` i `i += 9`. | **W pełni dynamiczne Mega Menu** ładujące kategorie i podkategorie z bazy danych wraz ze zdjęciami. |
| **Wycena i obliczenia** | `parseInt((x[5] * x[6]) * x[9])` – ucinanie wszystkich groszy/centów do liczb całkowitych! | Precyzyjne operacje na `Decimal` z zaokrąglaniem do 2 miejsc po przecinku (`.toFixed(2)` i `current_price`). |
| **Budowanie i Bundler** | Przestarzały Parcel wymagający ręcznego edytowania `index.html` po każdym buildzie i kopiowania tagów. | Błyskawiczny **Vite 5**, automatyczne proxy w trybie dev i jeden build produkcyjny integrujący się z Django. |
| **Gorący Strzał (Hotshot)** | Sztywno zaszyte warunki `session['email'] == 'adm'`. | API `/api/hotshot/` z zegarem odliczającym na żywo oraz panelem wyboru produktu i rabatu dla administratora. |
| **Zależności i pliki** | `requirements.txt` w UTF-16LE z Flaskiem i Werkzeugiem; brak `.venv`. | Czyste `requirements.txt` w UTF-8, przetestowane z Pythonem 3.14. |

---

## 🚀 Technologie

### Backend
- **Python 3.10+ / 3.14**
- **Django 5.x / 6.x**
- **Django REST Framework**
- **django-cors-headers**
- **WhiteNoise** (optymalne serwowanie plików statycznych)
- **SQLite** (lub PostgreSQL w produkcji)

### Frontend
- **React 18**
- **Vite 5**
- **React Router 6**
- **Bootstrap Icons**
- **Canvas Confetti** (efektowne potwierdzenie zamówienia)
- **Modern Dark CSS Design System**

---

## 💻 Szybki start (Lokalne uruchomienie)

### 1. Wymagania wstępne
- Python 3.10 lub nowszy
- Node.js 18 lub nowszy

### 2. Przygotowanie środowiska Python

```bash
# Aktywacja środowiska wirtualnego:
source .venv/bin/activate.fish  # jeśli używasz fish shell
# LUB: source .venv/bin/activate  # bash / zsh
# LUB: .venv\Scripts\activate     # Windows PowerShell

# Alternatywnie bez aktywacji (działa w każdym shellu):
.venv/bin/python manage.py migrate
.venv/bin/python manage.py seed_data

# Albo wygodnie przez npm:
npm run migrate
npm run seed
```

### 3. Przygotowanie Frontendu

```bash
cd frontend
npm install
npm run build
cd ..
```

### 4. Uruchomienie aplikacji

#### Wariant A: Pełna aplikacja serwowana przez Django (Zalecane na start)
```bash
python manage.py runserver
```
Otwórz w przeglądarce: **[http://127.0.0.1:8000/](http://127.0.0.1:8000/)**

#### Wariant B: Tryb deweloperski z Hot Module Replacement (Vite Dev Server)
W pierwszym terminalu:
```bash
python manage.py runserver
```
W drugim terminalu:
```bash
npm run dev
# lub: cd frontend && npm run dev
```
Otwórz w przeglądarce: **[http://localhost:5173/](http://localhost:5173/)** (zapytania `/api` są automatycznie proxowane do Django).

---

## 🔑 Konta testowe

Komenda `python manage.py seed_data` automatycznie tworzy konta testowe:

| Rola | Login | Hasło | Możliwości |
|---|---|---|---|
| **Administrator** | `admin` | `admin123` | Dostęp do panelu `/admin/`, zmiana Gorącego Strzału i rabatu wprost z UI |
| **Klient** | `klient` | `klient123` | Składanie zamówień, profil, historia koszyka |

---

## 📡 Dokumentacja REST API

Wszystkie endpointy zwracają dane w formacie JSON i obsługują uwierzytelnianie sesyjne z ochroną CSRF.

### Katalog
- `GET /api/categories/` – Pobiera listę kategorii z zagnieżdżonymi podkategoriami i liczbą produktów
- `GET /api/subcategories/?category=<id>` – Pobiera podkategorie wybranej kategorii
- `GET /api/products/` – Pobiera listę produktów. Obsługuje parametry:
  - `?category=<id>`
  - `?subcategory=<id>`
  - `?search=<tekst>`
  - `?on_sale=true` (tylko produkty w promocji)
  - `?ordering=price` / `-price` / `-rating` / `name`
- `GET /api/products/<id>/` – Szczegóły pojedynczego produktu
- `GET /api/hotshot/` – Aktualna oferta Gorącego Strzału
- `POST /api/hotshot/` – *(Tylko administrator)* Ustawienie nowego produktu i zniżki jako Gorący Strzał

### Koszyk (Działa zarówno dla gości jak i zalogowanych użytkowników)
- `GET /api/cart/` – Pobranie zawartości koszyka
- `POST /api/cart/add/` – Dodanie produktu (`{ "product_id": 1, "quantity": 1 }`)
- `POST /api/cart/update/` – Aktualizacja ilości (`{ "product_id": 1, "quantity": 3 }`)
- `POST /api/cart/remove/` – Usunięcie pozycji (`{ "product_id": 1 }`)
- `POST /api/cart/clear/` – Wyczyszczenie koszyka

### Autoryzacja
- `GET /api/auth/me/` – Informacje o aktualnie zalogowanym użytkowniku
- `POST /api/auth/login/` – Logowanie (`{ "username": "...", "password": "..." }`)
- `POST /api/auth/register/` – Rejestracja (`{ "username": "...", "email": "...", "password": "..." }`)
- `POST /api/auth/logout/` – Wylogowanie

### Zamówienia i Newsletter
- `POST /api/checkout/` – Złożenie zamówienia z koszyka (`{ "full_name", "email", "phone", "address", "city", "postal_code", "payment_method" }`)
- `POST /api/newsletter/` – Zapis na newsletter (`{ "email": "..." }`)

---

## 🧪 Testy automatyczne

Projekt posiada pełny zestaw testów jednostkowych i integracyjnych pokrywających API katalogu, koszyk, proces składania zamówień oraz uwierzytelnianie:

```bash
python manage.py test
```

---

## 📂 Struktura katalogów

```text
coop-shop/
├── frontend/                  # Nowoczesny kod Frontendu (React + Vite)
│   ├── src/
│   │   ├── components/        # Reużywalne komponenty (Navbar, Carousel, Hotshot, ProductCard, Modale)
│   │   ├── context/           # Zarządzanie stanem (AuthContext, CartContext)
│   │   ├── pages/             # Widoki (HomePage, ProductsPage, OnSalePage, CartPage, NewsletterPage)
│   │   ├── styles/            # Nowoczesny design system CSS (Dark theme)
│   │   ├── api.js             # Klient REST API z obsługą CSRF
│   │   ├── App.jsx            # Routing i obsługa modali
│   │   └── main.jsx           # Punkt wejścia React
│   ├── vite.config.js         # Konfiguracja Vite i proxy Django
│   └── package.json           # Zależności frontendowe
├── mysite/                    # Konfiguracja projektu Django
│   ├── settings.py            # Czyste ustawienia Django 5+ (CORS, REST, WhiteNoise, SQLite)
│   ├── urls.py                # Routing: /admin/, /api/ oraz fallback SPA
│   ├── wsgi.py / asgi.py
├── shop/                      # Aplikacja sklepu
│   ├── management/commands/   # Komendy Django (seed_data)
│   ├── migrations/            # Czyste migracje bazy danych
│   ├── models.py              # Modele PEP 8: Category, Subcategory, Product, Cart, Order
│   ├── serializers.py         # Serializery Django REST Framework
│   ├── views.py               # Kontrolery API oraz serwowanie SPA
│   ├── admin.py               # Panel administracyjny Django
│   ├── urls.py                # Routing endpointów REST API
│   ├── tests.py               # Testy automatyczne
│   └── static/shop/img/       # Zdjęcia produktów i kategorii
├── requirements.txt           # Zależności Pythona (UTF-8)
├── package.json               # Skrypty npm do wygodnego uruchamiania
└── manage.py                  # CLI Django
```
