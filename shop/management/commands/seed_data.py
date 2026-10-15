from decimal import Decimal
from django.contrib.auth.models import User
from django.core.management.base import BaseCommand
from shop.models import Category, Subcategory, Product


class Command(BaseCommand):
    help = 'Populates the database with clean store data, categories, subcategories, products, and admin accounts.'

    def handle(self, *args, **options):
        self.stdout.write('Seeding database with fresh e-commerce data...')

        # 1. Create superuser and demo user
        admin_user, created = User.objects.get_or_create(username='admin', defaults={
            'email': 'admin@pestka-shop.pl',
            'is_staff': True,
            'is_superuser': True,
        })
        if created:
            admin_user.set_password('admin123')
            admin_user.save()
            self.stdout.write(self.style.SUCCESS('Created admin superuser (admin / admin123)'))

        demo_user, created = User.objects.get_or_create(username='klient', defaults={
            'email': 'klient@example.com',
        })
        if created:
            demo_user.set_password('klient123')
            demo_user.save()
            self.stdout.write(self.style.SUCCESS('Created demo customer user (klient / klient123)'))

        # 2. Categories definition
        categories_data = [
            {'name': 'Podzespoły komputerowe', 'picture': '/static/shop/img/SUBCAT/CPU.jpg'},
            {'name': 'Komputery', 'picture': '/static/shop/img/SUBCAT/PC.webp'},
            {'name': 'Gaming', 'picture': '/static/shop/img/SUBCAT/GPU.jpg'},
            {'name': 'Smartfony i Akcesoria', 'picture': '/static/shop/img/SUBCAT/SSD.jpg'},
            {'name': 'Monitory i RTV', 'picture': '/static/shop/img/SUBCAT/MONITOR.jpg'},
            {'name': 'Audio i Dźwięk', 'picture': '/static/shop/img/SUBCAT/PSU.jpg'},
        ]

        cat_map = {}
        for c in categories_data:
            cat, _ = Category.objects.update_or_create(
                name=c['name'],
                defaults={'picture': c['picture']}
            )
            cat_map[c['name']] = cat

        # 3. Subcategories definition
        subcategories_data = [
            # Podzespoły komputerowe
            {'cat': 'Podzespoły komputerowe', 'name': 'Procesory', 'picture': '/static/shop/img/SUBCAT/CPU.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Płyty główne', 'picture': '/static/shop/img/SUBCAT/MOBO.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Karty graficzne', 'picture': '/static/shop/img/SUBCAT/GPU.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Pamięć RAM', 'picture': '/static/shop/img/SUBCAT/RAM.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Dyski SSD', 'picture': '/static/shop/img/SUBCAT/SSD.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Dyski HDD', 'picture': '/static/shop/img/SUBCAT/HDD.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Zasilacze', 'picture': '/static/shop/img/SUBCAT/PSU.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Chłodzenie CPU', 'picture': '/static/shop/img/SUBCAT/COOLER.jpg'},
            {'cat': 'Podzespoły komputerowe', 'name': 'Pasty termoprzewodzące', 'picture': '/static/shop/img/SUBCAT/PASTE.jpg'},
            # Komputery
            {'cat': 'Komputery', 'name': 'Komputery stacjonarne', 'picture': '/static/shop/img/SUBCAT/PC.webp'},
            {'cat': 'Komputery', 'name': 'Serwery', 'picture': '/static/shop/img/SUBCAT/SERVER.jpg'},
            {'cat': 'Komputery', 'name': 'Monitory', 'picture': '/static/shop/img/SUBCAT/MONITOR.jpg'},
            {'cat': 'Komputery', 'name': 'Software', 'picture': '/static/shop/img/SUBCAT/SOFTWARE.jpg'},
        ]

        subcat_map = {}
        for s in subcategories_data:
            subcat, _ = Subcategory.objects.update_or_create(
                category=cat_map[s['cat']],
                name=s['name'],
                defaults={'picture': s['picture']}
            )
            subcat_map[s['name']] = subcat

        # 4. Products definition with real images, ratings, descriptions and discounts
        products_data = [
            # Dyski SSD
            {
                'subcat': 'Dyski SSD',
                'name': 'Dysk SSD Kingston NV1 500 GB M.2 2280 PCI-E x4 Gen3 NVMe',
                'picture': '/static/shop/img/PRODUCTS/SSD_KINGSTON_NV1_NVME.jpg',
                'price': Decimal('240.00'),
                'discount_multiplier': Decimal('0.85'),
                'quantity': 15,
                'rating': Decimal('4.80'),
                'description': 'Szybki i niezawodny dysk SSD M.2 NVMe o prędkości odczytu do 2100 MB/s. Doskonały do laptopów i kompaktowych PC.',
            },
            {
                'subcat': 'Dyski SSD',
                'name': 'Dysk SSD Crucial MX500 500 GB 2.5" SATA III',
                'picture': '/static/shop/img/PRODUCTS/SSD_CRUCIAL_MX500_SATA.webp',
                'price': Decimal('270.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 10,
                'rating': Decimal('4.70'),
                'description': 'Jeden z najpopularniejszych dysków SSD 2.5 cala. Pamięć Micron 3D NAND zintegrowana z technologią Dynamic Write Acceleration.',
            },
            # Komputery stacjonarne
            {
                'subcat': 'Komputery stacjonarne',
                'name': 'Komputer HP Pavilion Gaming TG01, Core i5-11400F, 16 GB, RTX 3060, 512 GB M.2 PCIe',
                'picture': '/static/shop/img/PRODUCTS/PC_HP_PAVILION_GAMING_TG01.webp',
                'price': Decimal('4600.00'),
                'discount_multiplier': Decimal('0.88'),
                'quantity': 5,
                'rating': Decimal('4.90'),
                'description': 'Mocny zestaw gamingowy HP Pavilion w kompaktowej obudowie ze stylowym podświetleniem LED i kartą graficzną NVIDIA GeForce RTX 3060.',
            },
            {
                'subcat': 'Komputery stacjonarne',
                'name': 'Komputer Game X G100, Core i3-10100F, 16 GB, GTX 1060, 512 GB M.2 PCIe',
                'picture': '/static/shop/img/PRODUCTS/PC_ASUS_GAMEX.webp',
                'price': Decimal('2900.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 8,
                'rating': Decimal('4.50'),
                'description': 'Ekonomiczny komputer do gier e-sportowych takich jak CS2, Fortnite, LoL i Valorant. Wydajne chłodzenie i 16 GB pamięci RAM.',
            },
            {
                'subcat': 'Komputery stacjonarne',
                'name': 'Komputer Lenovo IdeaCentre Gaming 5i, Core i5-10400F, 16 GB, RTX 3060, 512 GB M.2 PCIe',
                'picture': '/static/shop/img/PRODUCTS/PC_ASUS_GAMEX.webp',
                'price': Decimal('5120.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 4,
                'rating': Decimal('4.75'),
                'description': 'Stylowa stacja robocza i maszyna do gier Lenovo IdeaCentre z procesorem 6-rdzeniowym i szybkim dyskiem NVMe.',
            },
            # Serwery
            {
                'subcat': 'Serwery',
                'name': 'Serwer Dell PowerEdge T40, Intel Xeon E-2224G, 8GB ECC, 1TB HDD',
                'picture': '/static/shop/img/PRODUCTS/SERVER_DELL_POWEREDGE_T30.jpg',
                'price': Decimal('5947.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 3,
                'rating': Decimal('4.60'),
                'description': 'Niezawodny serwer wieżowy dla małych i średnich firm. Zapewnia bezpieczne przechowywanie danych i płynne działanie bazy danych.',
            },
            {
                'subcat': 'Serwery',
                'name': 'Serwer HPE ProLiant ML30 Gen10, Xeon E-2314, 16GB ECC',
                'picture': '/static/shop/img/PRODUCTS/SERVER_HPE_PROLIANT_ML30_GEN_10.jpg',
                'price': Decimal('7454.00'),
                'discount_multiplier': Decimal('0.92'),
                'quantity': 2,
                'rating': Decimal('4.90'),
                'description': 'Potężny serwer firmowy z technologią HPE iLO 5, redundantnym zasilaniem i zaawansowanym kontrolerem Smart Array.',
            },
            # Monitory
            {
                'subcat': 'Monitory',
                'name': 'Monitor AOC C24G2U 24" Curved 165Hz 1ms FreeSync Premium',
                'picture': '/static/shop/img/PRODUCTS/MONITOR_ODDYSEY_G3.jpg',
                'price': Decimal('890.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 12,
                'rating': Decimal('4.65'),
                'description': 'Zakrzywiony monitor gamingowy o częstotliwości odświeżania 165Hz z regulowaną podstawą i żywymi kolorami matrycy VA.',
            },
            {
                'subcat': 'Monitory',
                'name': 'Monitor Samsung Odyssey G3A 27" 144Hz 1ms',
                'picture': '/static/shop/img/PRODUCTS/MONITOR_ODDYSEY_G3.jpg',
                'price': Decimal('990.00'),
                'discount_multiplier': Decimal('0.75'),
                'quantity': 10,
                'rating': Decimal('4.80'),
                'description': 'Monitor dla wymagających graczy. Ekran bez ramek z trzech stron, funkcje Eye Saver i Flicker Free eliminujące zmęczenie oczu.',
            },
            {
                'subcat': 'Monitory',
                'name': 'Monitor Asus VZ24EHE 23.8" IPS Full HD Ultra-Slim 75Hz',
                'picture': '/static/shop/img/PRODUCTS/MONITOR_ASUS_VZ24EHE.jpg',
                'price': Decimal('770.00'),
                'discount_multiplier': Decimal('0.65'),
                'quantity': 15,
                'rating': Decimal('4.85'),
                'is_hotshot': True,
                'description': 'Ultracienki monitor Asus z matrycą IPS o szerokich kątach widzenia 178 stopni i filtrem niebieskiego światła TÜV Rheinland.',
            },
            # Software
            {
                'subcat': 'Software',
                'name': 'System operacyjny Microsoft Windows 11 Home PL 64 bit OEM',
                'picture': '/static/shop/img/PRODUCTS/SOFTWARE_WINDOWS_11_PRO_OEM.jpg',
                'price': Decimal('550.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 25,
                'rating': Decimal('4.50'),
                'description': 'Oryginalna licencja OEM Windows 11 Home z nowym menu Start, zoptymalizowaną wydajnością gier oraz wsparciem dla DirectStorage.',
            },
            {
                'subcat': 'Software',
                'name': 'System operacyjny Microsoft Windows 11 Pro PL 64 bit OEM',
                'picture': '/static/shop/img/PRODUCTS/SOFTWARE_WINDOWS_11_PRO_OEM.jpg',
                'price': Decimal('650.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 18,
                'rating': Decimal('4.70'),
                'description': 'Wersja profesjonalna z obsługą BitLocker, Windows Sandbox, Remote Desktop oraz wirtualizacją Hyper-V.',
            },
            {
                'subcat': 'Software',
                'name': 'Microsoft Office Home and Business 2021 PL Licencja dożywotnia',
                'picture': '/static/shop/img/PRODUCTS/SOFTWARE_MICROSOFT_OFFICE_365_BUSSINES_STANDARD.jpg',
                'price': Decimal('1100.00'),
                'discount_multiplier': Decimal('0.90'),
                'quantity': 10,
                'rating': Decimal('4.90'),
                'description': 'Pakiet biurowy zawierający Word, Excel, PowerPoint i Outlook do użytku komercyjnego i domowego.',
            },
            # Pamięć RAM
            {
                'subcat': 'Pamięć RAM',
                'name': 'Pamięć Corsair Vengeance LPX, DDR4, 16 GB (2x8GB), 3200MHz, CL16',
                'picture': '/static/shop/img/PRODUCTS/RAM_CORSAIR_VENGEANCE.webp',
                'price': Decimal('350.00'),
                'discount_multiplier': Decimal('0.85'),
                'quantity': 20,
                'rating': Decimal('4.85'),
                'description': 'Wysokiej klasy pamięci RAM z aluminiowym radiatorem odprowadzającym ciepło. Wsparcie dla profili XMP 2.0.',
            },
            {
                'subcat': 'Pamięć RAM',
                'name': 'Pamięć Kingston Fury Beast, DDR4, 8 GB, 2666MHz, CL16',
                'picture': '/static/shop/img/PRODUCTS/RAM_KINGSTON_FURY_BEAST.webp',
                'price': Decimal('192.90'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 14,
                'rating': Decimal('4.60'),
                'description': 'Solidny i bezproblemowy moduł pamięci RAM z automatycznym przetaktowywaniem Plug N Play.',
            },
            # Płyty główne
            {
                'subcat': 'Płyty główne',
                'name': 'Płyta główna Gigabyte B450 AORUS PRO (Socket AM4)',
                'picture': '/static/shop/img/PRODUCTS/MOBO_AOURUS_PRO_B450.webp',
                'price': Decimal('380.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 8,
                'rating': Decimal('4.70'),
                'description': 'Solidna płyta główna ze wzmocnioną sekcją zasilania, dwoma slotami M.2 z osłonami termicznymi oraz podświetleniem RGB Fusion.',
            },
            {
                'subcat': 'Płyty główne',
                'name': 'Płyta główna Gigabyte B550 GAMING X V2 (PCIe 4.0, AM4)',
                'picture': '/static/shop/img/PRODUCTS/MOBO_GIGABYTE_GAMING_X_V2.jpg',
                'price': Decimal('474.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 11,
                'rating': Decimal('4.80'),
                'description': 'Nowoczesna płyta wspierająca procesory Ryzen serii 3000 i 5000, magistralę PCIe 4.0 oraz szybką łączność USB 3.2 Gen2.',
            },
            # Procesory
            {
                'subcat': 'Procesory',
                'name': 'Procesor Intel Core i5-10400F, 2.9GHz (4.3GHz Turbo), 12 MB, BOX',
                'picture': '/static/shop/img/PRODUCTS/CPU_i5_10400F.jpg',
                'price': Decimal('650.00'),
                'discount_multiplier': Decimal('0.85'),
                'quantity': 16,
                'rating': Decimal('4.90'),
                'description': '6 rdzeni i 12 wątków zapewniających doskonałą wydajność w grach i codziennej pracy. W zestawie fabryczny cooler Intel.',
            },
            {
                'subcat': 'Procesory',
                'name': 'Procesor AMD Ryzen 7 5800X, 3.8GHz (4.7GHz Turbo), 32 MB, BOX',
                'picture': '/static/shop/img/PRODUCTS/CPU_RYZEN_7_5800X.webp',
                'price': Decimal('1734.00'),
                'discount_multiplier': Decimal('0.80'),
                'quantity': 6,
                'rating': Decimal('4.95'),
                'description': '8 rdzeni, 16 wątków architektury Zen 3. Ekstremalna wydajność w grach i programach do renderingu, edycji wideo i projektowania 3D.',
            },
            # Karty graficzne
            {
                'subcat': 'Karty graficzne',
                'name': 'Karta graficzna PNY GeForce RTX 3060Ti Gaming Revel Epic-X RGB 8GB GDDR6',
                'picture': '/static/shop/img/PRODUCTS/GPU_PNY_RTX_3060TI.webp',
                'price': Decimal('3499.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 5,
                'rating': Decimal('4.90'),
                'description': 'Karta graficzna oparta na architekturze NVIDIA Ampere z obsługą Ray Tracingu drugiej generacji i DLSS.',
            },
            {
                'subcat': 'Karty graficzne',
                'name': 'Karta graficzna Gigabyte GeForce GTX 1660 OC 6GB GDDR5',
                'picture': '/static/shop/img/PRODUCTS/GPU_GIGABYTE_GTX_1660.png',
                'price': Decimal('1863.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 4,
                'rating': Decimal('4.60'),
                'description': 'Chłodzenie Windforce 2X z dwoma unikalnymi wentylatorami 90 mm obracającymi się w przeciwnych kierunkach.',
            },
            # Zasilacze
            {
                'subcat': 'Zasilacze',
                'name': 'Zasilacz SilentiumPC Vero M3 600W 80 Plus Bronze',
                'picture': '/static/shop/img/PRODUCTS/PSU_CORSAIR_CV_550W.jpg',
                'price': Decimal('289.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 10,
                'rating': Decimal('4.70'),
                'description': 'Cichy, półmodularny zasilacz z przetwornicą DC-DC i certyfikatem 80 PLUS Bronze gwarantującym wysoką sprawność.',
            },
            {
                'subcat': 'Zasilacze',
                'name': 'Zasilacz Corsair RM850x 850W 80 Plus Gold Modularny',
                'picture': '/static/shop/img/PRODUCTS/PSU_CORSAIR_RM850X.jpg',
                'price': Decimal('639.00'),
                'discount_multiplier': Decimal('0.85'),
                'quantity': 7,
                'rating': Decimal('4.95'),
                'description': 'W pełni modularny zasilacz klasy premium z japońskimi kondensatorami 105C i cichym trybem pracy Zero RPM.',
            },
            # Chłodzenie CPU
            {
                'subcat': 'Chłodzenie CPU',
                'name': 'Chłodzenie CPU SilentiumPC Fortis 5 Dual Fan 140mm',
                'picture': '/static/shop/img/PRODUCTS/COOLER_SPC_FERA_3.jpg',
                'price': Decimal('189.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 12,
                'rating': Decimal('4.80'),
                'description': 'Wydajny układ chłodzenia z asymetrycznym radiatorem i sześcioma rurkami heatpipe w bezpośrednim kontakcie z procesorem.',
            },
            {
                'subcat': 'Chłodzenie CPU',
                'name': 'Chłodzenie CPU Noctua NH-D15 chromax.black Dual Tower',
                'picture': '/static/shop/img/PRODUCTS/COOLER_NOCTUA_NH-D15.jpg',
                'price': Decimal('489.00'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 5,
                'rating': Decimal('5.00'),
                'description': 'Legendarne, bezkompromisowe chłodzenie procesora wyznaczające standardy ciszy i maksymalnej wydajności.',
            },
            # Pasty termoprzewodzące
            {
                'subcat': 'Pasty termoprzewodzące',
                'name': 'Pasta termoprzewodząca Arctic MX-2 8g',
                'picture': '/static/shop/img/PRODUCTS/TP_ARCTIC_MX-2_4G.jpg',
                'price': Decimal('26.99'),
                'discount_multiplier': Decimal('1.00'),
                'quantity': 30,
                'rating': Decimal('4.75'),
                'description': 'Łatwa w aplikacji pasta termoprzewodząca o wysokiej przewodności cieplnej, nieprzewodząca prądu elektrycznego.',
            },
            {
                'subcat': 'Pasty termoprzewodzące',
                'name': 'Pasta termoprzewodząca Thermal Grizzly Kryonaut 1g',
                'picture': '/static/shop/img/PRODUCTS/TP_THERMALGRIZZLY_KRYONAUT_1G.jpg',
                'price': Decimal('34.99'),
                'discount_multiplier': Decimal('0.85'),
                'quantity': 25,
                'rating': Decimal('4.95'),
                'description': 'Topowa pasta termiczna stworzona z myślą o ekstremalnym podkręcaniu (overclockingu) i najbardziej wymagających zastosowaniach.',
            },
        ]

        for p in products_data:
            Product.objects.update_or_create(
                name=p['name'],
                defaults={
                    'subcategory': subcat_map[p['subcat']],
                    'picture': p['picture'],
                    'price': p['price'],
                    'discount_multiplier': p['discount_multiplier'],
                    'quantity': p['quantity'],
                    'rating': p['rating'],
                    'description': p['description'],
                    'is_hotshot': p.get('is_hotshot', False),
                }
            )

        self.stdout.write(self.style.SUCCESS(
            f'Successfully seeded {len(categories_data)} categories, {len(subcategories_data)} subcategories, {len(products_data)} products.'
        ))
